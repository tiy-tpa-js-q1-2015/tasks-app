(function(views){

  var Icon = React.createClass({
    render: function() {
      // Create the fa class
      var cssClass = "fa fa-" + this.props.fa;
      // Add spin effect
      if(this.props.spin) {
        cssClass += " fa-spin";
      }

      return <i className={cssClass}/>;
    }
  });

  var Toggle = React.createClass({

    render: function() {
      var icon = this.props.on ? "toggle-on" : "toggle-off"
      return (
        <label className="toggle" onClick={this.props.onToggle}>
          <span>{this.props.name}</span>
          <Icon fa={icon}/>
        </label>
      );
    }

  });

  var Progress = React.createClass({
    render: function() {
      // Get percent or zero
      percent = this.props.percent || 0;
      // Normalize value
      var percent = Math.round(percent * 100);
      // Cap at 99
      var percent = _.min([percent, 99]);
      // No less than 10 either
      var percent = _.max([percent, 10]);
      // Make a string
      var percent = percent.toString() + "%";
      return (
        <div className="progress">
          <div className="complete" style={{width: percent}}></div>
        </div>
      );
    }
  });

  var BreadCrumbs = React.createBackboneClass({
    build: function() {
      return (this.props.data || []).map(function(crumb, index){
        return <a href="#" key={index} data-route={crumb.route}>{crumb.title}</a>
      });
    },
    render: function() {
      if (!this.props.model.id) {
        return <div/>;
      }
      return (
        <div className="breadcrumbs">
          {this.build()}
        </div>
      );
    }
  });

  views.Icon = Icon;
  views.Toggle = Toggle;
  views.Progress = Progress;
  views.BreadCrumbs = BreadCrumbs;

})(tiy.views);
