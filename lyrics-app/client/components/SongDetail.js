import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { RingLoader } from 'react-spinners';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
	render() {
		const { song } = this.props.data;

		if (!song) return <RingLoader size={100} />;

		return (
			<div>
				<Link to="/">Back</Link>
				<h3>{song.title}</h3>
				<LyricList lyrics={song.lyrics} />
				<LyricCreate songId={this.props.match.params.id} />
			</div>
		);
	}
}

export default graphql(fetchSong, {
	options: props => {
		return { variables: { id: props.match.params.id } };
	},
})(SongDetail);
