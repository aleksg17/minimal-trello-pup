import React from 'react'
import { useTrelloPowerupContext } from '../trello-setup/contexts/trello-powerup-context';

export default function MainModal() {
    const {
        revokeAuth,
        // token,
      } = useTrelloPowerupContext();
  return (
    <div>
    <div>MainModal</div>
    <button onClick={() => revokeAuth()}>Log out</button>
    </div>
  )
}
