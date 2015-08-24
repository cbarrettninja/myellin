'use strict';

var React = require('react/addons');
var ListGroupItem = require('react-bootstrap').ListGroupItem; 
var Glyphicon = require('react-bootstrap').Glyphicon; 
var ListGroup = require('react-bootstrap').ListGroup;
var Router = require('react-router');
var Button = require('react-bootstrap').Button;

require('firebase');
var ReactFireMixin = require('reactfire');

var AuthorName = require('./AuthorName');
var SubOutcomesMultiple = require('./SubOutcomesMultiple');

var CreatePlaylist = React.createClass({

  mixins: [Router.Navigation, Router.State, ReactFireMixin],

  propTypes: {
    relationData: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return {
      data: null
    };
  },

  componentWillMount: function() {
    this.bindFirebaseRefs();
  },

  componentDidUpdate: function(prevProps, nextState) {
    if (this.props.playlist_id !== prevProps.playlist_id){
      console.log('BIND EDIT PLAYLIST');
      this.bindFirebaseRefs(true);
    }
  },

  bindFirebaseRefs: function(rebind){

    if (rebind)
      this.unbind('data');

    var firebaseRoot = 'https://myelin-gabe.firebaseio.com';
    var firebase = new Firebase(firebaseRoot);

    this.refPlaylist = firebase.child('playlists/' + this.props.playlist_id);
    this.bindAsObject(this.refPlaylist, 'data');
  },

  render: function () {

    if (!this.state.data)
      return false;

    return (
      <div className="playlist-container" style={{position: 'fixed'}}>
        <div>

          <AuthorName id={this.state.data.author_id} />

          <textarea rows="5" style={{width:'100%', border: '1px solid #000', padding: '0.4em'}}>
            {this.state.data.description}
          </textarea>
          
        </div>

        <SubOutcomesMultiple 
          sortable={true}
          playlist_id={this.state.data.id} />
       
      </div>
    );
  }

});

module.exports = CreatePlaylist;