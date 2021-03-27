import React, { Component } from 'react';

import Header from "./header";
import Content from "./content";
import Footer from "./footer";

export default class App extends Component {
  constructor(){
    super()

    const todaysDate = new Date
    const monthNameList = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    this.state ={
      loading: true,
      month: monthNameList[todaysDate.getMonth()],
      year: todaysDate.getFullYear(),
      data: [],
      currentMonthData: {},
      error: false
    }
    this.handleMonthChange = this.handleMonthChange.bind(this)
  }

  componentDidMount() {
    fetch("https://lmp-calendar-app.herokuapp.com/month/get")
    .then(response => response.json())
    .then(data => this.setState({
      data: data,
      currentMonthData: data.filter(month => month.name ===this.state.month && month.year === this.state.year)[0],
      loading: false
    }))
    .catch(error => {
      console.log("Error while fetching month data: ", error)
      this.setState({
        error: true,
        loading: false
      })
    })
  }

  handleMonthChange(direction) {
    const monthNameList = ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const currentMonthIndex = monthNameList.indexOf(this.state.currentMonthData.name)
    this.setState({
      currentMonthData: this.state.data.filter(month => month.name === monthNameList[currentMonthIndex + direction] && month.year === this.state.year)[0]
    })
  }

  render() {
    if(this.state.loading){
      return (
      <div className="app">
        <h2>Loading...</h2>
      </div>)
    }
    
    if(this.state.error){
      return (
        <div className="app">
          <h2>Error loading page ... Please try again later</h2>
        </div>)
    }

    return (
      <div className='app'>
        <Header month={this.state.currentMonthData.name} handleMonthChange={this.handleMonthChange}/>
        <Content 
          monthId={this.state.currentMonthData.id}
          startDay ={this.state.currentMonthData.start_day} 
          daysInMonth={this.state.currentMonthData.days_in_month}
          daysInPreviousMonth={this.state.currentMonthData.days_in_previous_month} 
          />
        <Footer  year={this.state.currentMonthData.year}/>
      </div>
    );
  }
}
