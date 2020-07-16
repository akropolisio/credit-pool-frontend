/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as R from 'ramda';

import { useStyles } from './Table.style';
import * as c from './components';
import * as M from './models';

type Props<T, U> = {
  entries: T[];
  columns: Array<M.Column<T, U>>;
}

type RowToExpandedState = Record<number, boolean>;

export function Table<T, U = null>(props: Props<T, U>) {
  const classes = useStyles();

  const { columns, entries } = props;

  const [rowToExpanded, setRowToExpanded] = React.useState<RowToExpandedState>(entries.reduce((acc, _, index) => ({
    ...acc,
    [index]: false,
  }), {}));


  const expandedArea: M.ExpandedArea<T, U> | null = (() => {
    const contentWithRowExpander = columns
      .find(x => x.cellContent.kind === 'for-row-expander')?.cellContent as M.CellContentForRowExpander<T, U> | undefined

    return contentWithRowExpander?.expandedArea || null;
  })();

  return (
    <table className={classes.root}>
      <thead>
        <tr>
          {columns.map(renderTitle)}
        </tr>
      </thead>
      <tbody>
        {entries.map(renderEntry)}
      </tbody>
    </table>
  )

  function renderTitle(column: M.Column<T, U>, columnIndex: number) {
    return (
      <th key={columnIndex}>
        {column.renderTitle()}
      </th>
    )
  }

  function renderEntry(entry: T, rowIndex: number) {
    if (expandedArea === null) {
      return renderPrimaryEntryRow(entry, rowIndex);
    }

    return (
      <React.Fragment key={rowIndex}>
        {renderPrimaryEntryRow(entry, rowIndex)}
        {rowToExpanded[rowIndex] && renderExpandedArea(entry, expandedArea)}
      </React.Fragment>
    )
  }

  function renderExpandedArea(entry: T, area: M.ExpandedArea<T, U>) {
    switch (area.kind) {
      case 'single-cell':
        return renderAreaWithingSingleCell(entry, area);
      case 'subtable':
        return renderAreaWithinSubtable(entry, area);
    }
  }

  function renderAreaWithingSingleCell(entry: T, area: M.ExpandedAreaWithinSingleCell<T>) {
    return (
      <tr>
        <td colSpan={columns.length}>
          {area.renderContent(entry)}
        </td>
      </tr>
    )
  }

  function renderAreaWithinSubtable(entry: T, area: M.ExpandedAreaWithinSubtable<T, U>) {
    const entries = area.getSubtableEntries(entry);

    const adjustedSubtableColumns = (() => {
      const subtableCols = area.subtableColumns;

      const subtableColsNumber = area.subtableColumns.length;
      const tableColsNumber = columns.length;

      if (subtableColsNumber < tableColsNumber) {
        const colsToAdd = R.repeat<M.SubtableColumn<U>>({
          renderCell: () => null,
          renderTitle: () => null,
        }, tableColsNumber - subtableColsNumber);

        return subtableCols.concat(colsToAdd);
      }

      if (subtableColsNumber > tableColsNumber) {
        console.warn('unexpeced subtable columns number > table columns number');

        return subtableCols.slice(0, subtableColsNumber);
      }

      return subtableCols;
    })();

    return (
      <React.Fragment>
        <tr key="subtable-header" className={classes.subtableRow}>
          {adjustedSubtableColumns.map(renderSubtableHeader)}
        </tr>
        {entries.map(makeSubtableEntryRenderer(adjustedSubtableColumns))}
      </React.Fragment>
    );
  }

  function renderSubtableHeader(x: M.SubtableColumn<U>, columnIndex: number) {
    return (
      <th key={columnIndex}>
        {x.renderTitle()}
      </th>
    )
  }

  function makeSubtableEntryRenderer(subtableColumns: Array<M.SubtableColumn<U>>) {
    return (subtableEntry: U, subtableRowIndex: number) => {
      return (
        <tr className={classes.subtableRow} key={subtableRowIndex}>
          {subtableColumns.map(makeSubtableCellRenderer(subtableEntry))}
        </tr>
      );
    }
  }

  function makeSubtableCellRenderer(entry: U) {
    return (column: M.SubtableColumn<U>, columnIndex: number) => {
      return (
        <td key={columnIndex}>{column.renderCell(entry)}</td>
      )
    }
  }

  function renderPrimaryEntryRow(entry: T, rowIndex: number) {
    return (
      <tr>
        {columns.map(makeCellRenderer(entry, rowIndex))}
      </tr>
    );
  }


  function makeCellRenderer(entry: T, rowIndex: number) {
    return (column: M.Column<T, U>, columnIndex: number) => {
      switch (column.cellContent.kind) {
        case 'simple':
          return renderCellWithSimpleContent(entry, column.cellContent, columnIndex);

        case 'for-row-expander':
          return renderCellWithContentForRowExpander(rowIndex);
      }
    }
  }

  function renderCellWithSimpleContent(entry: T, content: M.SimpleCellContent<T>, columnIndex: number) {
    return (
      <td key={columnIndex}>
        {content.render(entry)}
      </td>
    );
  }

  function renderCellWithContentForRowExpander(rowIndex: number) {
    const handleToggle = (newValue: boolean) => setRowToExpanded({ ...rowToExpanded, [rowIndex]: newValue });

    return (
      <td key="row-expander">
        <c.RowExpander expanded={rowToExpanded[rowIndex]} onToggle={handleToggle} />
      </td>
    );
  }
}
