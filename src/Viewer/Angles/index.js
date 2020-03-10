/*

Romi 3D PlantViewer: An browser application for 3D scanned
plants.

Copyright (C) 2019-2020 Sony Computer Science Laboratories
              & Centre national de la recherche scientifique (CNRS)

Authors:
Nicolas Forestier, Ludovic Riffault, Léo Gourven, Benoit Lucet (DataVeyes)
Timothée Wintz, Peter Hanappe (Sony CSL)
Fabrice Besnard (CNRS)

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU Affero General Public
License as published by the Free Software Foundation, either
version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public
License along with this program.  If not, see
<https://www.gnu.org/licenses/>.

*/
import React from 'react'
import styled from '@emotion/styled'
import { FormattedMessage } from 'react-intl'
import { first } from 'lodash'

import { H2, H3 } from 'common/styles/UI/Text/titles'
import { grey, green, orange, lightGrey } from 'common/styles/colors'

import { useScan } from 'flow/scans/accessors'
import { useHoveredAngle, useSelectedAngle } from 'flow/interactions/accessors'

import helpIcon from './assets/ico.help.14x14.svg'
import Graph from './graph'
import Tooltip, { TooltipContent } from 'rd/UI/Tooltip'

export const moduleWidth = 300

const Container = styled.div({
  padding: '30px 40px',
  paddingTop: 12,
  paddingBottom: 19,
  width: moduleWidth,
  height: '100%',
  flexShrink: 0,
  borderTop: `1px solid ${lightGrey}`,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
})

const Top = styled.div({
  width: '100%'
})

const Title = styled(H2)({
  display: 'flex',
  alignItems: 'center'
})

const HelpIcon = styled.img({
  marginLeft: 6,
  marginBottom: -1,
  transition: 'all 0.15s ease',

  '&:hover': {
    transform: 'scale(1.20)'
  }
})

const Values = styled.div({
  marginTop: 32
})

const LegendItem = styled.div({
  fontSize: 11,
  color: grey,
  lineHeight: '18px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  marginBottom: 5,

  '& *': {
    display: 'inline-block'
  }
})

const Value = styled.div({
  color: 'white',
  opacity: 0.8,
  borderRadius: 1,
  padding: '0px 7px',
  letterSpacing: '0',
  transition: 'width 0.15s ease'
}, (props) => {
  return {
    backgroundColor: !props.secondary ? green : orange,
    padding: !props.condensed
      ? '0px 7px'
      : '0',
    width: !props.condensed
      ? 'auto'
      : 3,
    height: !props.condensed
      ? 'auto'
      : 18
  }
})

const ValueWording = styled.span({
  width: 123,
  display: 'inline-block'
})

const HelpContent = styled(H3)({
  width: 220,
  padding: 10,
  textTransform: 'initial',
  lineHeight: '17px',
  letterSpacing: 'normal'
})

export default function () {
  const [scan] = useScan()
  const [hoveredAngle] = useHoveredAngle()
  const [selectedAngle] = useSelectedAngle()

  const highlightedAngle = first([hoveredAngle, selectedAngle]
    .filter((value) => ((value !== null) && (value !== undefined))))

  if (!(scan && scan.data.angles)) return null

  const ifManualData = !!scan.data.angles.measured_angles
  const ifHighligthed = highlightedAngle !== null && highlightedAngle !== undefined

  return <Container>
    <Top>
      <Title>
        <FormattedMessage id='angles-title' />
        <div style={{ position: 'relative' }}>
          <Tooltip>

            <HelpIcon src={helpIcon} />

            <TooltipContent style={{
              left: -40,
              boxShadow: '0 1px 3px 0 rgba(10,61,33,0.2)'
            }}>
              <HelpContent>
                <FormattedMessage id='angles-tooltip' />
              </HelpContent>
            </TooltipContent>
          </Tooltip>
        </div>
      </Title>
      <Values>
        <LegendItem>
          <ValueWording>
            <FormattedMessage id='angles-legend-automated' />
          </ValueWording>
          <Value
            condensed={!ifHighligthed}
          >
            {
              ifHighligthed
                ? scan.data.angles.angles[highlightedAngle] !== null
                  ? (scan.data.angles.angles[highlightedAngle] * 57.2958).toFixed(0) + ' °'
                  : 'NA'
                : ''
            }
          </Value>
        </LegendItem>
        {
          ifManualData && <LegendItem>
            <ValueWording>
              <FormattedMessage id='angles-legend-manuel' />
            </ValueWording>
            <Value
              condensed={!ifHighligthed}
              secondary
            >
              {
                ifHighligthed
                  ? scan.data.angles.measured_angles[highlightedAngle] !== null
                    ? (scan.data.angles.measured_angles[highlightedAngle] * 57.2958).toFixed(0) + ' °'
                    : 'NA'
                  : ''
              }
            </Value>
          </LegendItem>
        }
      </Values>
    </Top>

    <Graph data={scan.data.angles} />
  </Container>
}
