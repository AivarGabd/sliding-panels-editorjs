import React, {useState} from "react";


class ListItem extends React.Component {
  renders = 0;

  
  handleUpdate = () => {
    this.props.onMyChange();
  };

  render() {
    const {
      data: { id, value }
    } = this.props;

    this.renders += 1;
    console.log("Row rendered");

    return (
      <div>
        <strong>id: </strong>
        {id}: &nbsp;
        <strong>value: </strong>
        {value} &nbsp;
        <strong>renders count: </strong>
        {this.renders} &nbsp;
        <button className="button" onClick={this.handleUpdate}>
          {" "}
          &nbsp; Change row value
        </button>
      </div>
    );
  }
}



export default function UpdatedListItem() {
  const [state, setState] = useState({
    list: [
      { id: "id 1", value: "11" },
      { id: "id 2", value: "22" }
    ]
  })

  
  const handleMyChange = (index) => {
   
    let newState = state.list.map((i, idx) =>
      idx === index ? { ...i, value: Math.round(100 + Math.random() * 5) } : i
    );

    
    setState(() => ({
      list: newState
    }));
  };




  return (
    <div>
      {state.list.map((el, index) => (
        <ListItem
          key={el.id}
          data={el}
          onMyChange={() => handleMyChange(index)}
        />
      ))}
    </div>
  );

}
