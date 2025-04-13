import { useActions } from "@/hooks/useActions";
import { BackButton } from "../ui/button";
import { Header } from "../wrappers/header";
import { Section } from "../wrappers/section";
import { Text } from "@/components/text/text";
import { Input } from "@/components/input/personal";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useMemo, useState } from "react";
import Image from 'next/image';
import { staticBlurDataUrl } from "@/utils/staticBlurDataUrl";
import Line from "../ui/line";
import ContextWrapper from "@/ui/context/wrapper";
import MenuWrapper from "../wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@/components/button/button";
import { faCamera, faCameraRetro, faUpload } from "@fortawesome/free-solid-svg-icons";
import fileService from "@/services/file.service";
import { SOURCE } from "@/services/sources.const";

interface Control {
    type: string;
    personal: string;
    description: string;
}

const Control: React.FC<Control> = ({ personal, description }) => {
    const [control, setControl] = useState(personal);

    // TODO: Textarea variant
    return (
        <Input
            header={description}
            type="text"
            value={control}
            red={false}
            handler={setControl}
            placeholder={description}
        />
    )
}

interface profileProps {
    // className?: string;
}

export const Profile = ({  }: profileProps) => {
    const [image, setImage] = useState<{ url: string; placeholder: string }>({
        url: staticBlurDataUrl(),
        placeholder: '',
    });
    const [file, setFile] = useState<File | string | null>(null);
    const { user, token } = useTypedSelector(state => state.user);
    const [username, setUsername] = useState(user.name);
    const { 
        setShouldShowProfile,
        updateUserPhotos
    } = useActions();

    const controls = useMemo(() => {
        return [
            { type: 'phone', personal: 'John', description: 'Firstname' },
            { type: 'name', personal: 'Doe', description: 'Lastname' },
            { type: 'bio', personal: 'https://music.youtube.com/watch?v=enm2i6wkWR8&si=nCR3a9m20YdHYTBh', description: 'Bio' },
        ]
    }, [user])

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input && input.files) {
            const file = input.files[0];
            setFile(file);

            const formData = new FormData();
            formData.append('picture', file ? file : '');

            const response = await fileService.changeProfilePicture({ formData, token });
            const photo = await response.text();

            if (photo) updateUserPhotos(photo);
        }

    };

    return (
        <Section>
            <Header>
                <BackButton onClick={() => setShouldShowProfile(false)} />
                <Text size='xl' bold>Edit Profile</Text>
            </Header>
            <MenuWrapper>
                <div className="flex flex-col gap-5 p-6">
                    <div className="self-center relative">
                        <Image
                            src={user.picture[0] ? `${SOURCE}/${user.picture[0]}` : image.url}
                            alt="User picture"
                            width={200}
                            height={200}
                            placeholder="blur"
                            blurDataURL={image.placeholder || staticBlurDataUrl()}
                            className="rounded-full object-cover"
                            style={{ width: 200, height: 200 }}
                        />
                        <IconButton className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                            <label
                                htmlFor="uploadimage"
                                className="flex items-center justify-center w-full h-full
                                cursor-pointer min-h-[300px]"
                            >
                                <FontAwesomeIcon 
                                    className="w-[60px] h-[60px] hover:w-[70px] hover:h-[70px] transition-all duration-300 ease-in-out"
                                    // style={{ width: '65px', height: '65px' }}
                                    icon={faCamera} 
                                />
                            </label>
                            <input
                                id="uploadimage"
                                name="image"
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </IconButton>
                    </div>
                    {controls.map((control) => <Control key={control.type} {...control} />)}
                    <Text size="m" color="gray" bold>
                        Any details such as age, occupation or city.
                        <br />
                        Example: 23 y.o. designer from San Francisco
                    </Text>

                    <Line size="xl" color="#161515" rounded />

                    <Text bold color="gray" size="lm">Username</Text>

                    <Input
                        header={'Username'}
                        type="text"
                        value={username}
                        red={false}
                        handler={setUsername}
                        placeholder={"Username"}
                    />

                    <Text size="m" bold color="gray">
                        You can choose a username on <b>Telegram</b> . If you do, people will be able to find you by this username and contact you without needing your phone number.
                        <br /><br />
                        You can use <b>a–z</b>, <b>0–9</b> and underscores. Minimum length is <b>5</b> characters.  
                    </Text>
                    <Text size="m" bold color="gray">
                        This link opens a chat with you:
                        <br />
                        https://t.me/{user.name}  
                    </Text>
                </div>
            </MenuWrapper>
        </Section>
    );
};
