import classes from "./Table.module.scss";

const Table = (props) => {
  const headings = props.headings.map((item, i) => (
    <th key={i} className={classes[`th-${i}`]}>
      {item}
    </th>
  ));

  return (
    <div className={classes["table-box"]}>
      <table>
        <thead>
          <tr>{headings}</tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default Table;
