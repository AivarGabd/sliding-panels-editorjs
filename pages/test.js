import React from "react";


class ListItem extends React.Component {
  renders = 0;

  shouldComponentUpdate(nextProps, nextState) {
    // Custom update conditions.
    return nextProps.data.value !== this.props.data.value;
  }

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

export default class Test extends React.Component {
  state = {
    list: [
      { id: "id 1", value: "11" },
      { id: "id 2", value: "22" }
    ]
  };

  handleMyChange = (index) => {
    console.log(index);
    let newState = this.state.list.map((i, idx) =>
      idx === index ? { ...i, value: Math.round(100 + Math.random() * 5) } : i
    );
    this.setState(() => ({
      list: newState
    }));
  };

  render() {
    console.log("App rendered");

    return (
      <div>
        {this.state.list.map((el, index) => (
          <ListItem
            key={el.id}
            data={el}
            onMyChange={() => this.handleMyChange(index)}
          />
        ))}
      </div>
    );
  }
}
