/** Lista de pontos com o marcador em hexágono da home (a forma do logo). */
const PointList = ({ items }: { items: string[] }) => (
  <ul className="page-points">
    {items.map((item) => (
      <li key={item} data-reveal="item">
        {item}
      </li>
    ))}
  </ul>
);

export default PointList;
