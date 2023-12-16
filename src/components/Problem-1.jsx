import React, { useState } from "react";



const initial = { name: "", status: "" }

const Problem1 = () => {

  const [show, setShow] = useState("all");

  const [user, setUser] = useState(initial);

  const [result, setResult] = useState([]);

  const [filtered,setFiltered] = useState([])

  


  const filteredHandler = ()=>{
  

    if(show==="active"){
        return result?.filter((item)=>item?.status?.toLowerCase()==="active");
    }

    if(show==="completed"){
        return result?.filter((item)=>item?.status?.toLowerCase()==="completed");
    }

    const data = [...result]

    const statusOrder = { active: 1, completed: 2 };

const sortedData = data.sort((a, b) => {
  const statusA = statusOrder[a.status.toLowerCase()] || 3; 
  const statusB = statusOrder[b.status.toLowerCase()] || 3;

  if (statusA !== statusB) {
    return statusA - statusB;
  } else {
    // If statuses are the same, sort by name
    return a.name.localeCompare(b.name);
  }
});


    return sortedData

  }

  const handleClick = (val) => {
    setShow(val);
  };

  const onChangeHandler = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setResult((prev)=>[...prev,user])
    setUser(initial)
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={onSubmitHandler}
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                value={user?.name}
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                value={user?.status}
                onChange={onChangeHandler}
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
    {filteredHandler()?.map((user,i)=><tr key={i}>
        <td>{user?.name}</td>
        <td>{user?.status}</td>
    </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
