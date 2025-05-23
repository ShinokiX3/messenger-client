import { IconButton } from "@/components/button/button";
import { Header } from "../wrappers/header";
import { Section } from "../wrappers/section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@/components/text/text";
import { 
    faEllipsisVertical,
    faPencil, 
    faArrowLeft, 
    IconDefinition, 
    faPhone,
    faAt,
    faCircleExclamation
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { staticBlurDataUrl } from "@/utils/staticBlurDataUrl";
import { useMemo, useState } from "react";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { BackButton } from "../ui/button";
import { SOURCE } from "@/services/sources.const";
import MenuWrapper from "../wrapper";
import ContextLogout from "@/components/context/logout";

interface Control {
    icon: IconDefinition;
    personal: string;
    description: string;
}

const Control: React.FC<Control> = ({ icon, personal, description }) => {
    return (
        <div className="flex gap-3 cursor-pointer hover:bg-theme-side-bg-shade rounded-[0.7rem] p-2">
            <div className="flex min-w-[40px] justify-center">
                <FontAwesomeIcon className="w-[1.2rem] h-[1.2rem] self-center text-color-message" icon={icon} />
            </div>
            <div>
                <Text size="l" wrap bold>{personal}</Text>
                <Text size="m" bold color="gray">{description}</Text>
            </div>
        </div>
    )
}

export const Settings: React.FC = () => {
    const [image, setImage] = useState<{ url: string; placeholder: string }>({
        url: staticBlurDataUrl(),
        placeholder: '',
    });
    const [shouldLogout, setShouldLogout] = useState(false);

    const { user } = useTypedSelector(state => state.user);
    const { 
        setShouldShowSettings,
        setShouldShowProfile
    } = useActions();

    const controls = useMemo(() => {
        return [
            { type: 'phone', icon: faPhone, personal: user.phone, description: 'Phone' },
            { type: 'name', icon: faAt, personal: user.name, description: 'Username' },
            { type: 'bio', icon: faCircleExclamation, personal: 'https://music.youtube.com/watch?v=enm2i6wkWR8&si=nCR3a9m20YdHYTBh', description: 'Bio' },
        ]
    }, [user])

    console.log(user);

    return (
        <Section>
			<Header>
				<div className="flex items-center gap-3 w-full">
					<BackButton onClick={() => setShouldShowSettings(false)} />
					<Text size='xl' bold>Settings</Text>
					<div className='flex justify-end w-full relative'>
						<IconButton onClick={() => setShouldShowProfile(true)}>
							<FontAwesomeIcon icon={faPencil} />
						</IconButton>
						<IconButton onClick={() => setShouldLogout(!shouldLogout)}>
							<FontAwesomeIcon icon={faEllipsisVertical} />
                            { shouldLogout 
                                && <ContextLogout styles={{ padding: '5px', left: 'initial', right: '0', top: '50', width: '225px' }} /> 
                            }
						</IconButton>
					</div>
				</div>
			</Header>
			<MenuWrapper>
                <div className="flex flex-col">
                    <div className='flex relative'>
                        <Image
                            src={user.picture[0] ? `${SOURCE}/${user.picture[0]}` : image.url}
                            alt="User picture"
                            width={200}
                            height={200}
                            sizes="100vw"
                            placeholder={"blur"}
                            blurDataURL={image.placeholder || staticBlurDataUrl()}
                            style={{ width: '100%', height: 'auto' }}
                        />
                        <div className="absolute bottom-[15px] left-[25px]">
                            <Text size="xl" bold>{user.name}</Text>
                            <Text size="m">Last seen recently...</Text>
                        </div>
                    </div>
                    <div className='flex flex-col h-[20dvh] p-2 gap-3'>
                        {controls.map((control) => <Control key={control.type} {...control} /> )}
                    </div>
                </div>
            </MenuWrapper>
		</Section>
    );
};
