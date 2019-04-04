import React from 'react'

export default class Customize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: this.props.home
    }
    console.log(this.props.home);
  }
  
  toggleTacticMenu = () => {
    const tacticButton = document.querySelector('.Tactic')
    if (tacticButton.classList.contains('expanded')) {
      // Collapse menu
      tacticButton.classList.remove('expanded')
    } else {
      // Expand menu
      tacticButton.classList.add('expanded')
      this.outsideClickHandler(tacticButton)
    }
  }
  
  toggleColorMenu = () => {
    const homeOrAwayButton = document.querySelector('.HomeOrAway')
    if (homeOrAwayButton.classList.contains('expanded')) {
      // Collapse menu
      homeOrAwayButton.classList.remove('expanded')
    } else {
      // Expand menu
      homeOrAwayButton.classList.add('expanded')
      this.outsideClickHandler(homeOrAwayButton)
    }
  }

  outsideClickHandler = button => {
    document.addEventListener('click', e => {
      const isClickInside = button.contains(e.target);
      if (!isClickInside) {
        // User clicked outside
        if (button.classList.contains('-') && button.classList.contains('expanded')) {
          // Collapse tactic menu
          e.preventDefault()
          this.toggleTacticMenu()
        } else if (button.classList.contains('HomeOrAway') && button.classList.contains('expanded')) {
          // Collapse tactic menu
          e.preventDefault()
          this.toggleColorMenu()
        }
      }
    });
  }

  setHome = (home) => {
    if(home){
      this.setState({
        home: 'Hemma'
      })
    }else{
      this.setState({
        home: 'Borta'
      })    
    }
  }

  render() {
    let DownloadButton = null
    if (this.props.downloadStatus === "disabled") {
      DownloadButton = <a
        title="Generate lineup"
        className="CTA disabled"
      >Lägg till 11 spelare</a>
    } else if (this.props.downloadStatus === "create") {
      DownloadButton = <a
        title="Generate lineup"
        className="CTA"
        onClick={() => {
          // Display loading message
          this.props.createCanvas()
        }}
      >Skapa bild</a>
    } else if (this.props.downloadStatus === "loading") {
      DownloadButton = <a
        title="Generate lineup"
        className="CTA disabled"
      >Genererar bild...</a>
    } else {
      DownloadButton = <a
        title="Generate lineup"
        className="CTA"
        download="11builder"
        href={this.props.downloadLink}
      >Ladda ner bild</a>
    }
    return(
      <div className="Customize">
        <div
          className="Tactic Menu"
          onClick={ () => {this.toggleTacticMenu()} }
        >
          <div className="Options">
            <div data-tactic="4-2-3-1" onClick={() => { this.props.setActiveTactic('4-2-3-1') }}>4-2-3-1</div>
            <div data-tactic="4-2-3-1" onClick={() => { this.props.setActiveTactic('4-4-2') }}>4-4-2</div>
            <div data-tactic="4-2-3-1" onClick={() => { this.props.setActiveTactic('3-5-2') }}>3-5-2</div>
            <div data-tactic="4-2-3-1" onClick={() => { this.props.setActiveTactic('3-4-3') }}>3-4-3</div>
          </div>
          <p className="Selected">{this.props.activeTacticName}</p>
        </div>
        <div
          className="HomeOrAway Menu"
          onClick={() => {this.toggleColorMenu()}}
        >
          <div className="Options">
            <div data-tactic="4-2-3-1" onClick={() => { this.setHome(true)}}>Hemma</div>
            {//<div data-tactic="4-2-3-1" onClick={() => { this.setHome(false)}}>Borta</div>
            }
          </div>
          <p className="Selected">{this.state.home}</p>
        </div>
        {DownloadButton}
      </div>
    )
  }
}
