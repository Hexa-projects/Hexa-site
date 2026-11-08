/** Ficha técnica: tabela de dados do fabricante, sempre com a fonte declarada embaixo. */
const SpecTable = ({ caption, source, rows }: { caption: string; source: string; rows: [string, string][] }) => (
  <div className="page-spec" data-reveal="media">
    <table>
      <caption>{caption}</caption>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="page-spec__source">Fonte: {source}</p>
  </div>
);

export default SpecTable;
