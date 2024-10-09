import React, { ReactNode } from 'react';
import { Popconfirm } from 'antd';
import { UserAvatar } from '../avatar';
import { stringToHSL } from '../../libs/utils';
import ChatIcon from '../../assets/icons/material-chat.svg';
import styles from './user-details-card.module.css';

export interface UserDetailsCardProps {
	id: string
	src?: string | ReactNode
	displayName: string
	email: string
	showEmail?: boolean
	showDm?: boolean
	handleDMUser?: (userId: string) => Promise<void>
	userStatus?: string
	lastseen?: string
	showLastseen?: boolean
}

export const UserDetailsCard: React.FunctionComponent<UserDetailsCardProps> = (props) => {
	const {
		id, src, displayName, email, showEmail, showDm, handleDMUser, userStatus, showLastseen,
		lastseen,
	} = props;
	let lastseenDate;
	const formatTimestamp = (timestamp: any) => {
		const now = new Date().getTime();
		const diff = now - timestamp;
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		if (days > 0) {
			return `${timestamp.getDate()}-${timestamp.getMonth() + 1}-${timestamp.getFullYear()}${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
		}
		if (hours > 0) {
			return `${hours} hours ago`;
		}
		if (minutes > 0) {
			return `${minutes} minutes ago`;
		}
		if (seconds > 0) {
			return `${seconds} seconds ago`;
		}
		return 'a moment ago';
	};
	if (lastseen !== '-1') {
		lastseenDate = new Date(Number(lastseen));
		lastseenDate = formatTimestamp(lastseenDate);
	}
	// console.log(123, lastseen);
	return (
		<div className={styles.userDetailsCard}>
			<div className={styles.userDetailsCardHeader} style={{ backgroundColor: stringToHSL(id) }}>
				<div className={styles.userAvatarBox}>
					<UserAvatar
						id={id}
						src={src}
						displayName={displayName}
						size={155}
						style={
							{ fontSize: 55 }
						}
					/>
				</div>
			</div>
			<div className={styles.userDetailsCardBody}>
				{/* <small>NAME</small> */}
				<p className={styles.detailsCardName}>{displayName}</p>
				{showEmail && (
					<>
						{/* <small>EMAIL</small> */}
						<p className={styles.detailsCardEmail}>{email}</p>
					</>
				)}
				<p style={{ marginBottom: 0 }}>
					{userStatus}
				</p>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					position: 'absolute',
					top: '140px',
					right: '24px',
				}}
			>
				<div>
				{showLastseen && lastseen === '-1'
					? (
						<div style={{ display: 'flex', float: 'right' }}>
							{/* <p>{lastseen}</p> */}
							{/* <small>EMAIL</small> */}
							{/* <h1>hj</h1> */}
							<h4>
								<span style={{ fontWeight: 'bold' }}>
									Status:
								</span>
								Online
							</h4>
						</div>
					)
					: (
						<div style={{ display: 'flex', float: 'right' }}>
							{/* <p>{lastseen}</p> */}
							{/* <small>EMAIL</small> */}
							{/* <h1>hj</h1> */}
							<h4>
								<span style={{ fontWeight: 'bold' }}>
									Status:
								</span>
								{lastseenDate}
							</h4>
						</div>
					) }
				</div>
				{handleDMUser && showDm ? (
					<div>
						<Popconfirm
							title="DM this user?"
							onConfirm={() => handleDMUser(id)}
						>
							<img src={ChatIcon} alt="dm" style={{ height: '20px' }} />
						</Popconfirm>
						<small className={styles.dmDecription}>
							Message @
							{displayName}
						</small>
					</div>
				) : ''}
			</div>
		</div>
	);
};
