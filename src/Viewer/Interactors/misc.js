import React from 'react'
import styled from '@emotion/styled'
import { FormattedMessage } from 'react-intl'
import { CirclePicker } from 'react-color'

import { useSelectedAngle, useColor, useDefaultColors } from 'flow/interactions/accessors'
import { useMisc, useLayers } from 'flow/settings/accessors'

import Tooltip, { TooltipContent } from 'rd/UI/Tooltip'
import MenuBox, { MenuBoxContent } from 'rd/UI/MenuBox'
import { IconStateCatcher } from 'rd/UI/Icon'
import { PaintIcon } from 'Viewer/Interactors/icons'
import resetArrow from 'common/assets/ico.reset.20x20.svg'

import { H3 } from 'common/styles/UI/Text/titles'

import { Interactor } from './index'

// This enum can be exported later if need be
const tools = {
  colorPickers: {
    mesh: 0,
    pointCloud: 1,
    skeleton: 2,
    organs: 3
  }
}

export const Container = styled.div({
  position: 'absolute',
  top: 60,
  left: 20,
  display: 'flex',

  '& :first-of-type > div': {
    borderRadius: '2px 0 0 2px'
  },

  '& :last-of-type > div': {
    borderRadius: '0 2px 2px 0'
  }
})

const ColumnContainer = styled.div({
}, (props) => {
  return {
    display: 'flex',
    visibility: props.displayed
      ? 'visible'
      : 'hidden',
    flexDirection: 'column',
    marginLeft: 0,
    marginRight: 0
  }
})

const ResetButton = styled.div({
  backgroundImage: `url(${resetArrow})`,
  width: 20,
  height: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 10,
  cursor: 'pointer'
})

const MiscContainer = styled(Container)({
})

function ToolButton (props) {
  return <MenuBox
    activate={props.activated}
    {...props.menuBox}
  >
    <Tooltip>
      <Interactor
        activated={props.activated}
        {...props.interactor}
      >
        <IconStateCatcher style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {props.icon}
        </IconStateCatcher>
      </Interactor>
      <TooltipContent>
        <H3>
          <FormattedMessage id={props.tooltipId} />
        </H3>
      </TooltipContent>
    </Tooltip>
    <MenuBoxContent style={{
      padding: 10
    }} >
      {props.children}
    </MenuBoxContent>
  </MenuBox>
}

export default function MiscInteractors () {
  const [selectedAngle] = useSelectedAngle()
  const [colors, setColors] = useColor()
  const [resetDefaultColor] = useDefaultColors()
  const [misc, setMisc] = useMisc()
  const [layers] = useLayers()

  return <MiscContainer>
    <ColumnContainer displayed={layers.mesh}>
      <ToolButton
        activated={misc.activeTool === tools.colorPickers.mesh}
        menuBox={{
          callOnChange: () => {
            if (misc.activeTool === tools.colorPickers.mesh) {
              setMisc({ ...misc, activeTool: null })
            }
          },
          watchChange: [layers.mesh],
          onClose: () => {
            if (misc.activeTool === tools.colorPickers.mesh) {
              setMisc({ ...misc, activeTool: null })
            }
          }
        }}
        interactor={{
          onClick: () => {
            setMisc({ ...misc,
              activeTool: misc.activeTool === tools.colorPickers.mesh
                ? null
                : tools.colorPickers.mesh })
          },
          isButton: true
        }}
        tooltipId='tooltip-mesh-color-picker'
        icon={<PaintIcon isActivated={misc.activeTool ===
          tools.colorPickers.mesh} />}
      >
        <CirclePicker
          onChange={
            (color) => {
              setColors({
                ...colors,
                mesh: color.hex
              })
            }
          }
          color={colors.mesh}
        />
      </ToolButton>
    </ColumnContainer>
    <ColumnContainer displayed={layers.pointCloud}>
      <ToolButton
        activated={misc.activeTool === tools.colorPickers.pointCloud}
        menuBox={{
          callOnChange: () => {
            if (misc.activeTool === tools.colorPickers.pointCloud) {
              setMisc({ ...misc, activeTool: null })
            }
          },
          watchChange: [layers.pointCloud],
          onClose: () => {
            if (misc.activeTool === tools.colorPickers.pointCloud) {
              setMisc({ ...misc, activeTool: null })
            }
          }
        }}
        interactor={{
          onClick: () => {
            setMisc({ ...misc,
              activeTool: misc.activeTool === tools.colorPickers.pointCloud
                ? null
                : tools.colorPickers.pointCloud
            })
          },
          isButton: true
        }}
        tooltipId={'tooltip-point-cloud-color-picker'}
        icon={<PaintIcon isActivated={misc.activeTool ===
        tools.colorPickers.pointCloud} />}
      >
        <CirclePicker
          onChange={
            (color) => {
              setColors({
                ...colors,
                pointCloud: color.hex
              })
            }
          }
          color={colors.pointCloud}
        />
      </ToolButton>
    </ColumnContainer>
    <ColumnContainer displayed={layers.skeleton}>
      <ToolButton
        activated={misc.activeTool === tools.colorPickers.skeleton}
        menuBox={{
          callOnChange: () => {
            if (misc.activeTool === tools.colorPickers.skeleton) {
              setMisc({ ...misc, activeTool: null })
            }
          },
          watchChange: [layers.skeleton],
          onClose: () => {
            if (misc.activeTool === tools.colorPickers.skeleton) {
              setMisc({ ...misc, activeTool: null })
            }
          }
        }}
        interactor={{
          onClick: () => {
            setMisc({ ...misc,
              activeTool: misc.activeTool === tools.colorPickers.skeleton
                ? null
                : tools.colorPickers.skeleton
            })
          },
          isButton: true
        }}
        tooltipId={'tooltip-skeleton-color-picker'}
        icon={<PaintIcon isActivated={misc.activeTool ===
          tools.colorPickers.skeleton} />}
      >
        <CirclePicker
          onChange={
            (color) => {
              setColors({
                ...colors,
                skeleton: color.hex
              })
            }
          }
          color={colors.skeleton}
        />
      </ToolButton>
    </ColumnContainer>
    <ColumnContainer displayed={layers.angles}>
      <ToolButton
        activated={misc.activeTool === tools.colorPickers.organs}
        menuBox={{
          callOnChange: () => {
            if (misc.activeTool === tools.colorPickers.organs) {
              setMisc({ ...misc, activeTool: null })
            }
          },
          watchChange: [layers.angles, selectedAngle],
          onClose: () => {
            if (misc.activeTool === tools.colorPickers.organs) {
              setMisc({ ...misc, activeTool: null })
            }
          }
        }}
        interactor={{
          onClick: () => {
            setMisc({ ...misc,
              activeTool: misc.activeTool === tools.colorPickers.organs
                ? null
                : tools.colorPickers.organs })
          },
          isButton: true
        }}
        tooltipId={(selectedAngle === undefined || selectedAngle === null)
          ? 'tooltip-organ-global-color-picker'
          : 'tooltip-organ-color-picker'
        }
        icon={<PaintIcon isActivated={misc.activeTool ===
          tools.colorPickers.organs} />}
      >
        <CirclePicker
          onChange={
            (color) => {
              let color2 = color.hsl
              // Use a lighter color for the second organ of the pair
              color2.l += 0.3
              const color2String = 'hsl(' + Math.round(color2.h) + ', ' +
                color2.s.toFixed(2) * 100 + '%, ' + color2.l.toFixed(2) * 100 +
                '%)'
              if (selectedAngle !== undefined && selectedAngle !== null) {
                let copy = colors.organs.slice()
                const next = selectedAngle + 1
                copy[selectedAngle] = color.hex
                copy[next] = color2String
                setColors({
                  ...colors,
                  organs: copy
                })
              } else {
                setColors({
                  ...colors,
                  globalOrganColors: [color.hex, color2String]
                })
              }
            }
          }
          color={(selectedAngle !== undefined && selectedAngle !== null)
            ? colors.organs[selectedAngle]
            : colors.globalOrganColors[0]}
        />
        <ResetButton
          onClick={
            () => {
              resetDefaultColor('organs')
              resetDefaultColor('globalOrganColors')
            }
          }
        />
      </ToolButton>
    </ColumnContainer>
  </MiscContainer>
}
