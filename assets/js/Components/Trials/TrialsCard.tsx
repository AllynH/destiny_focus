import { DestinyInventoryItemDefinition, DestinyObjectiveProgress } from 'bungie-api-ts/destiny2'
import React, { useEffect, useState } from 'react'
import { GetActivityDefinition } from '../../Utils/API/API_Requests'
import DisplayPerks from '../Bounties/DisplayPerks'
import { SingleCheckBox } from '../Profile/Checkboxes'
import { ProgressBar } from '../Progress/ProgressBar'

import './style.css'

export default function TrialsCard(props: {
  trialsCard: DestinyObjectiveProgress[]
  definitionHash: number
}) {
  const [definition, setDefinition] = useState<DestinyInventoryItemDefinition>(null)
  const { trialsCard, definitionHash } = props

  useEffect(() => {
    const fetchProgressionsDefinition = async () => {
      const result: DestinyInventoryItemDefinition = await GetActivityDefinition({
        params: { definition: 'DestinyInventoryItemDefinition', defHash: definitionHash },
      })
      setDefinition(result)
    }
    fetchProgressionsDefinition()
  }, [props])

  const data = {
    wins: {
      progress: trialsCard[0].progress,
      progressPercent: Number(
        ((trialsCard[0].progress / trialsCard[0].completionValue) * 100).toFixed(2)
      ),
      completionValue: trialsCard[0].completionValue,
      objectiveHash: 1586211619,
    },
    flawless: {
      progress: trialsCard[1].progress,
      completionValue: trialsCard[1].completionValue,
      flawlessFlag: trialsCard[1].complete,
      objectiveHash: 2369244651,
    },
    roundsWon: {
      progress: trialsCard[3].progress,
      objectiveHash: 984122744,
    },
  }

  const iconStyle = {
    backgroundImage: `url(https://www.bungie.net${definition?.displayProperties?.icon})`,
    width: 60,
    height: 60,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
  }

  return (
    <div className='trials-card-wrapper progressions-item-wrap'>
      <div className='trials-card-heading'>
        <h3 className='progressions-mode-title'>
          {definition ? definition?.displayProperties?.name : 'Trials Passage'}
        </h3>
      </div>
      <div className='trials-card-image-wrapper'>
        {definition ? <div className='trials-card-image' style={iconStyle}></div> : <div></div>}
        <div className='trials-card-content-wrapper'>
          <div className='trials-card-item-wrapper'>
            <SingleCheckBox win={data.flawless.flawlessFlag} modeColour={'var(--bungie-power)'} />
            <div className='trials-card-item-text'> Flawless</div>
          </div>
          <div className='trials-card-item-wrapper'>
            <div className='trials-card-item-text'>{data.roundsWon.progress}</div>
            <div className='trials-card-item-text'>Rounds won</div>
          </div>

          {definition &&
            definition.perks.map((perk, key) => (
              <div key={key} className='trials-card-item-wrapper'>
                <DisplayPerks definitionHash={perk.perkHash} />
              </div>
            ))}
        </div>
      </div>
      <div className='progress-bar-wrap'>
        <ProgressBar
          progress={data.wins.progressPercent}
          theme={'trials'}
          message={`Wins`}
          steps={`${data.wins.progress} / ${data.wins.completionValue}`}
        />
      </div>
    </div>
  )
}
