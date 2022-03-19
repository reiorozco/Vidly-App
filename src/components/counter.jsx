import React, { Component } from "react";
import { Badge, Button } from "@mui/material";

class Counter extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <>
        <Badge
          sx={{ margin: 3 }}
          badgeContent={this.formatCount()}
          color={this.getBadgeClasses()}
        />

        <Button onClick={this.handleIncrement} variant={"contained"}>
          Increment
        </Button>
      </>
    );
  }

  getBadgeClasses() {
    const { count } = this.state;
    return count === 0 ? "warning" : "secondary";
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
