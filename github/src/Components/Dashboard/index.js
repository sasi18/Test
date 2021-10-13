import React from "react";
import { createUseStyles } from "react-jss";
import axios from "axios";

const styles = createUseStyles({
  wrapper: {
    border: "2px solid black",
    margin: "10px",
    padding: 8,
  },

  content: {
    margin: "10px",
  },

  studentDetails: {
    color: "blue",
    fontSize: "23px",
  },
  container: {
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  table: {
    borderCollapse: "collapse",
    width: "100%",
    padding: 8,
  },

  label: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: 8,
    width: "30%",
  },

  header: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: 8,
    width: "69px",
  },

  dataContent: {
    margin: 10,
  },
  btn: {
    display: "block",
    border: "none",
    fontSize: 18,
    marginTop: 10,
    background: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
});

export default function Dashboard() {
  const [name, setName] = React.useState("");

  const [data, setData] = React.useState([]);

  const classes = styles();

  //getting  value from the input
  const onChange = (e) => {
    setName(e.target.value);
  };

  //network call for api
  const onClick = () => {
    axios
      .get(`https://api.github.com/users/${name}/repos`)
      .then((res) => {
        console.log(res.data, "res");
        setData(res.data);
      }) // we can catch the error in console
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <>
      <div className={classes.wrapper}>
        <label>Enter Github Username :</label>

        <input type='text' id='name' name='name' onChange={onChange} />
        <button className={classes.btn} onClick={onClick}>
          Submit
        </button>
      </div>
      <h2 className={classes.content}>Repos of {name}</h2>
      <div className={classes.dataContent}>
        <table className={classes.table}>
          <tr>
            <th className={classes.header}>Repo Name</th>
            <th className={classes.header}>Language</th>
            <th className={classes.header}>Description</th>
          </tr>
        </table>
        {data.map((name, i) => {
          return (
            <>
              <tr>
                <td className={classes.label}>{name.name}</td>
                <td className={classes.label}>{name.language}</td>
                <td className={classes.label}>{name.description}</td>
              </tr>
            </>
          );
        })}
      </div>
    </>
  );
}
