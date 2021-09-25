import React from 'react'
import { useService } from '@xstate/react'

import Modal from 'react-bootstrap/Modal'

import {
	service,
	Context,
	BlockchainEvent,
	BlockchainState,
} from '../../machine'

import sunflower from '../../images/sunflower/fruit.png'
import potato from '../../images/potato/fruit.png'
import pumpkin from '../../images/pumpkin/fruit.png'
import beetroot from '../../images/beetroot/fruit.png'
import cauliflower from '../../images/cauliflower/fruit.png'
import parsnip from '../../images/parsnip/fruit.png'
import radish from '../../images/radish/fruit.png'

import cancel from '../../images/ui/cancel.png'

import { getPrice } from '../../utils/land'
import { getMarketRate } from '../../utils/supply'

import { Panel } from './Panel'
import { Message } from './Message'
import { Button } from './Button'

import './UpgradeModal.css'

interface Props {
	isOpen: boolean
	onClose: () => void
	farmSize: number
	balance: number
}

export const UpgradeModal: React.FC<Props> = ({
	isOpen,
	onClose,
	farmSize,
	balance,
}) => {
	const [machineState, send] = useService<
		Context,
		BlockchainEvent,
		BlockchainState
	>(service)
	const [totalSupply, setTotalSupply] = React.useState<number>(1)

	React.useEffect(() => {
		const load = async () => {
			const supply = await service.machine.context.blockChain.totalSupply()
			setTotalSupply(supply)
		}

		load()
	}, [isOpen])

	const onUpgrade = () => {
		send('UPGRADE')
		onClose()
	}

	const marketRate = getMarketRate(totalSupply)

	const price = getPrice(farmSize)

	const hasFunds = balance >= price

	const isUnsaved = machineState.context.blockChain.isUnsaved()

	return (
		<Modal centered show={isOpen} onHide={onClose}>
			<Panel>
				<div id="charity-container">
					<span>Upgrade Farm</span>
					<span id="donate-description">
						Upgrade your farm to unlock new plants and harvestable
						fields.
					</span>
					{isUnsaved && (
						<>
							<div className="upgrade-required">
								<Message>
									Unsaved game
									<img
										src={cancel}
										className="insufficient-funds-cross"
									/>
								</Message>
							</div>
							<span className="upgrade-warning">
								You must first save your farm to the blockchain
								before attempting to upgrade.{' '}
							</span>
						</>
					)}
					<div id="charities">
						<div>
							<span className="charity-description">
								5 fields
							</span>
							<div className="upgrade-icons">
								<img
									src={sunflower}
									className="upgrade-fruit"
								/>
								<img src={potato} className="upgrade-fruit" />
							</div>
						</div>
						<div>
							<span className="charity-description">
								8 fields
							</span>
							<div className="upgrade-icons">
								<img src={pumpkin} className="upgrade-fruit" />
								<img src={beetroot} className="upgrade-fruit" />
							</div>
							{farmSize < 8 && (
								<div className="charity-buttons">
									<span>{`$${1 / marketRate}`}</span>
									<Button
										disabled={balance < 1 / marketRate}
										onClick={onUpgrade}
									>
										Upgrade
									</Button>
								</div>
							)}
						</div>
						<div>
							<span className="charity-description">
								11 fields
							</span>
							<div className="upgrade-icons">
								<img
									src={cauliflower}
									className="upgrade-fruit"
								/>
							</div>
							{farmSize < 11 && (
								<div className="charity-buttons">
									<span>{`$${50 / marketRate}`}</span>
									<Button
										disabled={farmSize < 8 || balance < 50 / marketRate}
										onClick={onUpgrade}
									>
										Upgrade
									</Button>
								</div>
							)}
						</div>
						<div>
							<span className="charity-description">
								14 fields
							</span>
							<div className="upgrade-icons">
								<img src={parsnip} className="upgrade-fruit" />
							</div>
							{farmSize < 14 && (
								<div className="charity-buttons">
									<span>{`$${500 / marketRate}`}</span>
									<Button
										disabled={
											farmSize < 11 || balance < 500 / marketRate
										}
										onClick={onUpgrade}
									>
										Upgrade
									</Button>
								</div>
							)}
						</div>
						<div>
							<span className="charity-description">
								17 fields
							</span>
							<div className="upgrade-icons">
								<img src={radish} className="upgrade-fruit" />
							</div>
							{farmSize < 17 && (
								<div className="charity-buttons">
									<span>{`$${2500 / marketRate}`}</span>
									<Button
										disabled={
											farmSize < 14 || balance < 2500 / marketRate
										}
										onClick={onUpgrade}
									>
										Upgrade
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</Panel>
		</Modal>
	)
}

export const UpgradeOverlay = (props) => (
	<div id="tester" {...props}>
		<Message>Upgrade required</Message>
	</div>
)
