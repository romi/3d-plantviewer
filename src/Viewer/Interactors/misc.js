import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from '@emotion/styled'

import { useMisc, useCarousel } from 'flow/settings/accessors'
import { useColor, useDefaultColors, useSnapshot, useRuler }
  from 'flow/interactions/accessors'
import ToolButton, { tools } from 'Viewer/Interactors/Tools'
import { H3, H2 } from 'common/styles/UI/Text/titles'

import { SnapIcon, PhotoSetIcon, RulerIcon, BackgroundColorIcon } from 'Viewer/Interactors/icons'
import { Interactor } from 'Viewer/Interactors'

import snapButton from 'common/assets/ico.snap.24x24.svg'
import downloadButton from 'common/assets/ico.download.24x24.svg'

import { SketchPicker } from 'react-color'

import { ResetButton } from 'rd/UI/Buttons'
import Tooltip, { TooltipContent } from 'rd/UI/Tooltip'

export const Container = styled.div({
  position: 'absolute',
  top: 20,
  right: 50,
  display: 'flex',

  '& :first-of-type > div': {
    borderRadius: '2px 0 0 2px'
  },

  '& :last-of-type > div': {
    borderRadius: '0 2px 2px 0'
  }
})

const ChooserContainer = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const PhotoSetButtonContainer = styled.div({
  cursor: 'pointer',
  borderRadius: 5,
  textAlign: 'center',
  marginBottom: 5,
  fontSize: 18,
  lineHeight: 2,
  padding: 2,
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '1px 1px 3px 3px limegreen'
  }
}, (props) => ({
  transition: 'all 0.3s ease',
  opacity: props.active ? 1 : 0.4,
  boxShadow: props.active ? '1px 1px 3px 3px limegreen' : 'none'
}))

const MiscContainer = styled(Container)({})

const InputResolution = styled.input({
  width: 70,
  border: 0,
  fontSize: '2em',
  textAlign: 'center',
  borderBottom: '2px solid black',
  MozAppearance: 'textfield',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0
  },
  '&:focus': {
    transition: 'border-bottom 0.5s ease',
    border: 0,
    borderBottom: '3px solid #00a960',
    outline: 0,
    outlineOffset: 0,
    padding: 0
  }
})

const HoverContainer = styled.div({
  transition: 'all 1s ease',
  opacity: '1',
  cursor: 'pointer',
  '&:hover': {
    transition: 'all 1s ease',
    opacity: '0.3'
  }
})

const SnapButtonImage = styled.div({
  backgroundImage: `url(${snapButton})`,
  width: 30,
  height: 30,
  backgroundSize: 'cover',
  cursor: 'pointer'
})

const DownloadButtonImage = styled.div({
  '@keyframes fadein': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  animation: 'fadein 1s ease',
  backgroundImage: `url(${downloadButton})`,
  backgroundSize: 'cover',
  width: 30,
  height: 30,
  cursor: 'pointer'
})

function PhotoSetButton ({ set }) {
  const [carousel, setCarousel] = useCarousel()
  return <PhotoSetButtonContainer
    active={carousel.photoSet === set}
    onClick={() => setCarousel({ ...carousel, photoSet: set })}
  >
    <FormattedMessage id={'photoset-' + set.toLowerCase()} />
  </PhotoSetButtonContainer>
}

function DownloadButton (props) {
  return <Tooltip>
    <TooltipContent>
      <H3> <FormattedMessage id='tooltip-download-snapshot' /> </H3>
    </TooltipContent>
    <DownloadButtonImage
    />
  </Tooltip>
}

function SnapButton (props) {
  return <Tooltip>
    <TooltipContent>
      <H3> <FormattedMessage id='tooltip-take-snapshot' /> </H3>
    </TooltipContent>
    <SnapButtonImage />
  </Tooltip>
}

function GenerateDownloadButton (props) {
  return <a
    style={{ margin: 'auto', cursor: 'pointer' }}
    href={props.image}
    download='snapshot.png'
    data-testid='gendlbutton'
    onClick={
      !props.image ? props.onGenerateClick : null
    }
  >
    <H3> {props.image
      ? <DownloadButton /> : <SnapButton />} </H3>
  </a>
}

function ImagePreview (props) {
  return <Tooltip>
    <HoverContainer
      onClick={props.onClick}>
      <img
        src={props.image}
        width='100%'
        height='100%'
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 0,
          marginBottom: 10,
          maxWidth: '100%',
          height: 'auto'
        }}
        // TODO: Update the react-intl version to translate the alt
        alt='Preview of the snapshot'
      />
    </HoverContainer>
    <TooltipContent
      style={{ top: '50%' }}>
      <H3> <FormattedMessage id='tooltip-delete-snapshot' /> </H3>
    </TooltipContent>
  </Tooltip>
}

// const windowG = typeof window !== 'undefined' && window

var bgroundColor = '#ECF3F0'
if (!window.localStorage.getItem('defaultBgroundColor')) window.localStorage.setItem('defaultBgroundColor', bgroundColor)

export default function () {
  const [snapshot, setSnapshot] = useSnapshot()
  const [snapWidth, setSnapWidth] = useState(0)
  const [snapHeight, setSnapHeight] = useState(0)
  const [colors, setColors] = useColor()
  const [resetDefaultColor] = useDefaultColors()
  const [misc, setMisc] = useMisc()
  const [ruler, setRuler] = useRuler()

  useEffect(() => {
    if (misc.activeTool === null) {
      setSnapshot({
        ...snapshot,
        snapResolution: null
      })
    }
  }, [misc.activeTool])

  return <MiscContainer>
    <ToolButton data-testid='ruler'
      toolsList={useMisc()}
      tool={tools.misc.ruler}
      tooltipId='tooltip-ruler'
      icon={<RulerIcon
        isActivated={misc.activeTool === tools.misc.ruler} />}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        justifyItems: 'center'
      }} >
        <H3>
          <FormattedMessage id='ruler-scale' />
        </H3>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          marginBottom: 10
        }} >
          <InputResolution
            type='number'
            min='0.0001'
            step='1'
            placeholder='scale'
            onChange={(e) => {
              const value = e.target.value > 0.0001 ? e.target.value : 0.0001
              setMisc({ ...misc, scale: value })
            }}
            value={misc.scale} /> <H3> cm </H3>
        </div>
        <Tooltip>
          <Interactor
            style={{ margin: 'auto', width: '100%', marginBottom: 10 }}
            activated={ruler.scaling}
            isButton
            onClick={() => {
              if (!ruler.measuring) {
                setRuler({ ...ruler, scaling: !ruler.scaling })
              }
            }}
          >
            <H2> <FormattedMessage id='scale-button' /> </H2>
          </Interactor>
          <TooltipContent>
            <H3> <FormattedMessage id='tooltip-scale-button' /> </H3>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <Interactor
            isDisabled={!ruler.scaleSet}
            style={{ margin: 'auto', width: '100%' }}
            activated={ruler.measuring}
            isButton
            onClick={() => {
              if (!ruler.scaling) {
                setRuler({ ...ruler,
                  measuring: !ruler.measuring })
              }
            }}
          >
            <H2> <FormattedMessage id='measure-button' /> </H2>
          </Interactor>
          <TooltipContent>
            <H3>
              <FormattedMessage
                id={ruler.scaleSet ? 'tooltip-measure-button' : 'tooltip-scale-needed'} />
            </H3>
          </TooltipContent>
        </Tooltip>
        <H3 style={{ margin: 'auto', marginTop: 10 }}>
          <FormattedMessage id='current-measure' />
        </H3>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          marginBottom: 10
        }} >
          <InputResolution
            style={{ margin: 'auto' }}
            value={ruler.measure ? (misc.scale * ruler.measure).toFixed(3) : 0}
            readOnly
          />
          <H3> cm </H3>
        </div>
      </div>
    </ToolButton>
    <ToolButton data-testid='background'
      toolsList={useMisc()}
      tool={tools.colorPickers.background}
      interactor={{
        isButton: true
      }}
      tooltipId='tooltip-background-color-picker'
      icon={<BackgroundColorIcon
        isActivated={misc.activeTool === tools.colorPickers.background} />}
    >
      <div data-testid='background-color'>
        <SketchPicker disableAlpha
          // color={localStorage.getItem("defaultBgroundColor")}
          onChange={
            (color) => {
              setColors({
                ...colors,
                background: color.hex
              })
              window.localStorage.setItem('defaultBgroundColor', color.hex)
            }
          }
          // color={colors.background}
          // {...window.alert(localStorage.getItem("defaultBgroundColor"))}
          color={window.localStorage.getItem('defaultBgroundColor')}
        />
      </div>
      <ResetButton
        onClick={
          () => {
            window.localStorage.setItem('defaultBgroundColor', bgroundColor)
            resetDefaultColor('background')
          }
        }
      />
    </ToolButton>
    <ToolButton
      toolsList={useMisc()}
      tool={tools.misc.snapshot}
      icon={<SnapIcon isActivated={misc.activeTool === tools.misc.snapshot} />}
      interactor={{
        isButton: true
      }}
      tooltipId='tooltip-snapshot'
    >
      <div style={{
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
      }} data-testid='snapshot-menu'>
        <Tooltip
          style={{
            padding: 0,
            margin: 'auto',
            width: 40
          }}>
          <ResetButton
            onClick={
              () => {
                setSnapWidth(snapshot.trueResolution.width)
                setSnapHeight(snapshot.trueResolution.height)
              }
            }
          />
          <TooltipContent>
            <H3> <FormattedMessage id='tooltip-reset-resolution' /> </H3>
          </TooltipContent>
        </Tooltip>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto'
        }} >
          <InputResolution
            type='number'
            min='0'
            max='4096'
            step='10'
            placeholder='X'
            onChange={
              (e) => {
                setSnapWidth(parseInt(
                  Math.min(Math.max(e.target.value, 0), 4096)))
              }
            }
            value={
              snapWidth ||
                (snapshot.trueResolution
                  ? snapshot.trueResolution.width
                  : 0)}
          /> <H3> X </H3>
          <InputResolution
            type='number'
            min='0'
            max='2160'
            step='10'
            placeholder='Y'
            onChange={
              (e) => {
                setSnapHeight(parseInt(Math.min(Math.max(
                  e.target.value, 0), 2160)))
              }
            }
            value={
              snapHeight ||
                (snapshot.trueResolution
                  ? snapshot.trueResolution.height
                  : 0)}
          />
        </div>
        { snapshot.image
          ? <div>
            <H3
              style={{ textAlign: 'center' }}>
              <FormattedMessage id='snapshot-preview' />
            </H3>
            <ImagePreview
              image={snapshot.image}
              onClick={
                () => {
                  setSnapshot({
                    ...snapshot,
                    image: null
                  })
                }
              }
            />
          </div>
          : null
        }
        <GenerateDownloadButton
          image={snapshot.image}
          onGenerateClick={
            () => {
              setSnapshot({
                ...snapshot,
                snapResolution: { width: snapWidth, height: snapHeight }
              })
            }
          } />
      </div>
    </ToolButton>
    <ToolButton
      toolsList={useMisc()}
      tool={tools.misc.photoSets}
      icon={<PhotoSetIcon
        isActivated={misc.activeTool === tools.misc.photoSets} />}
      interactor={{
        isButton: true
      }}
      tooltipId='tooltip-photoset'
    >
      <div data-testid='photoset-menu'>
        <ChooserContainer>
          <PhotoSetButton set='images' />
          <PhotoSetButton set='undistorted' />
          <PhotoSetButton set='masks' />
        </ChooserContainer>
      </div>
    </ToolButton>
  </MiscContainer>
}
