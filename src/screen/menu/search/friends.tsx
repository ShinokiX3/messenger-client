// import Image from 'next/image';
import Image from '@/components/image/image';
import MenuWrapper from '../wrapper';
import { memo } from 'react';

export const FriendRounded = () => {
	return (
		<div
			className="p-user-ico-wrapper-p flex flex-col 
            items-center hover:bg-[#2c2c2c] 
            rounded-default-border-radius cursor-pointer"
		>
			<div
				className="m-user-ico-wrapper-inner-m 
                mb-[0.375rem] w-[3.375rem] h-[3.375rem]"
			>
				<Image w="[3.375rem]" h="[3.375rem]" mr="none" />
			</div>
			<p className="text-[0.75rem]">User</p>
		</div>
	);
};

const FriendsSlider = () => {
	return (
		<MenuWrapper>
			<div
				className="menu-content-appearance-effect 
                flex rounded-default-border-radius gap-[0.5rem] h-fit"
			>
				<FriendRounded />
			</div>
		</MenuWrapper>
	);
};

export default memo(FriendsSlider);
