import { useId } from "react";
import { Link } from "react-router-dom";

type CompareTableProps = {
  caption: string;
  source: string;
  /** Um equipamento por coluna; com `href`, o nome leva à página dele. */
  columns: { label: string; href?: string }[];
  rows: { label: string; values: string[] }[];
};

/** Espaço sem quebra entre número e unidade ("9 m²", "0,31 T"), para a unidade não descer sozinha. */
const NBSP = String.fromCharCode(160);
const keepUnit = (value: string) => value.replace(/(\d) /g, `$1${NBSP}`);

/**
 * Comparativo de equipamentos no painel da ficha técnica: um modelo por coluna, um dado por linha,
 * com a fonte embaixo. No celular a tabela rola dentro do painel (região focável) e o rótulo da linha fica fixo.
 */
const CompareTable = ({ caption, source, columns, rows }: CompareTableProps) => {
  const captionId = useId();
  return (
    <div className="page-spec page-compare" data-reveal="media">
      {/* Título visível fora da rolagem (no celular o caption rolaria junto); o caption fica para leitores de tela. */}
      <p className="page-compare__title" aria-hidden="true">
        {caption}
      </p>
      <div className="page-compare__scroll" role="region" aria-labelledby={captionId} tabIndex={0}>
        <table>
          <caption id={captionId} className="sr-only">
            {caption}
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Dado</span>
              </th>
              {columns.map((column) => (
                <th key={column.label} scope="col">
                  {column.href ? <Link to={column.href}>{column.label}</Link> : column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={columns[index]?.label ?? index}>{keepUnit(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="page-spec__source">Fonte: {source}</p>
    </div>
  );
};

export default CompareTable;
