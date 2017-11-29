import React from 'react'
import { db } from '~/public/secrets'

// grab screenplays from database
  // list id, title, owners, short description (?)
  // make a func to get rid of last comma of authors array
  // what about anon users?
  // grab elements properly (map prob won't work here)

export default () =>
  {
    db.ref('screenplays').map(screenplay =>
      <div>
        <h3>{`${screenplay.id}. ${screenplay.title.toUpperCase()}`}</h3>
        <h6>{`Screenplay by ${screenplay.authors.join(', ').trim()}`}</h6>
      </div>
    )
  }