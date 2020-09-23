import React from 'react'

export default function DisplayAccountStats(props) {
  return (

    <div>
        <div className="stats-wrapper">
            <div className="stats life-time-stats">
                <div className="stats circle-outer">
                    <div className="stats circle">
                        <p className="stats stats-title-next-line stats-big"><span className="stats-title-next-line">LIFETIME KILLS</span><span className="stats stats-value-next-line">{props.stats.kills.basic.displayValue}</span></p>
                        <p className="stats stats-title"><span>DEATHS&nbsp;</span><span className="stats stats-value">{props.stats.deaths.basic.displayValue}</span></p>
                        <p className="stats stats-title"><span>KDR&nbsp;</span><span className="stats stats-value">{props.stats.killsDeathsRatio.basic.displayValue}</span></p>
                    </div>
                </div>
            </div>
            <div className="stats life-time-stats">
                <div className="stats circle-outer">
                    <div className="stats circle">
                        <div className="stats stats-title-next-line stats-big"><span className="stats-title-next-line">AVG. GAME KILLS</span><span className="stats stats-value-next-line">{props.stats.kills.pga.displayValue}</span></div>
                        <div className="stats stats-title"><span>DEATHS&nbsp;</span><span className="stats stats-value">{props.stats.deaths.pga.displayValue}</span></div>
                        <div className="stats stats-title"><span>KDR&nbsp;</span><span className="stats stats-value">{parseFloat(props.stats.kills.pga.displayValue / props.stats.deaths.pga.displayValue).toFixed(2)}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="stats-wrapper">
            <div className="stats activity_stats">
                <h2>Activity stats:</h2>
                <div>Activities entered: {props.stats.activitiesEntered.basic.displayValue}</div>
                <div>Activities won: {props.stats.activitiesWon.basic.displayValue}</div>
                <div>Win / Loss Ratio: {props.stats.winLossRatio.basic.displayValue}</div>
                <div>Time played: {props.stats.allParticipantsTimePlayed.basic.displayValue}</div>
            </div>
            <div className="stats kdr_stats">
                <h2>Kill / Death ratio:</h2>
                <div>Kills: {props.stats.kills.basic.displayValue}</div>
                <div>Deaths: {props.stats.deaths.basic.displayValue}</div>
                <div>Assists: {props.stats.assists.basic.displayValue}</div>
                <div>Kills / Death ratio: {props.stats.killsDeathsRatio.basic.displayValue}</div>
                <div>Kills / Death / Assists ratio: {props.stats.killsDeathsAssists.basic.displayValue}</div>
                <div>Efficiency: {props.stats.efficiency.basic.displayValue}</div>
            </div>
            <div className="stats high_score_stats">
                <h2>High scores:</h2>
                <div>Best single game kills: {props.stats.bestSingleGameKills.basic.displayValue}</div>
                <div>Longest kill distance: {props.stats.longestKillDistance.basic.displayValue}</div>
                <div>Longest kill spree: {props.stats.longestKillSpree.basic.displayValue}</div>
                <div>Longest single life: {props.stats.longestSingleLife.basic.displayValue}</div>
                <div>Precision kills: {props.stats.precisionKills.basic.displayValue}</div>
                <div>Most precision kills: {props.stats.mostPrecisionKills.basic.displayValue}</div>
                <div>Suicides: {props.stats.suicides.basic.displayValue}</div>
            </div>

            <div className="stats average_score_stats">
                <h2>Average game scores:</h2>
                <div>Avg. kills per game: {props.stats.kills.pga.displayValue}</div>
                <div>Avg. deaths per game: {props.stats.deaths.pga.displayValue}</div>
                <div>Avg. assists per game: {props.stats.assists.pga.displayValue}</div>
                <div>Average kill distance: {props.stats.averageKillDistance.basic.displayValue}</div>
                <div>Average life span: {props.stats.averageLifespan.basic.displayValue}</div>
                <div>Avg. precision kills per game: {props.stats.precisionKills.pga.displayValue}</div>
                <div>Avg. suicides per game: {props.stats.suicides.pga.displayValue}</div>
            </div>

            <div className="stats weapon_stats">
                <h2>Favourite weapons:</h2>
                <div>Best weapon: {props.stats.weaponBestType.basic.displayValue}</div>
                <div>Melee kills: {props.stats.weaponKillsMelee.basic.displayValue}</div>
                <div>Avg. melee kills per game: {props.stats.weaponKillsMelee.pga.displayValue}</div>
            </div>
        </div>
    </div>
  )
}

