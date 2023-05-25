import {
  Text,
  Avatar,
  Button,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Popover,
} from "@chakra-ui/react";
import { ChevronDownIcon, EmailIcon, InfoIcon } from "@chakra-ui/icons";
import {
  AuthContextState,
  useAuthContext,
} from "@/components/context/AuthContext";
import useWindowSize from "@/components/hook/useWindowSize";

const ProfilePopOver = ({
  logoutClickHandler,
}: {
  logoutClickHandler: () => void;
}) => {
  const { user } = useAuthContext() as AuthContextState;
  const { width } = useWindowSize();

  const getName = () => {
    if (user?.fullname) {
      const firstname = user.fullname.split(" ")[0];
      return firstname;
    }

    return "";
  };
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Text
          fontSize="lg"
          onClick={() => {}}
          className="cursor-pointer font-bold"
          color="#7F8A96"
        >
          Hello, {getName()} <ChevronDownIcon />{" "}
        </Text>
      </PopoverTrigger>
      <PopoverContent top={width > 1024 ? "10" : "0.5"}>
        <PopoverArrow />
        <PopoverBody
          paddingX={4}
          paddingY={4}
          display="flex"
          flexDirection="column"
          gap="4"
        >
          <div className="flex gap-4">
            <Avatar name={user?.fullname} />
            <div className="flex flex-col">
              <Text>{user?.fullname}</Text>
              <Text>@{user?.username}</Text>
            </div>
          </div>
          <hr />
          <div className="flex gap-4 items-center">
            <EmailIcon />
            <Text>{user?.email}</Text>
          </div>
          <div className="flex gap-4 items-center">
            <InfoIcon />
            <Text>{user?.role}</Text>
          </div>
          <Button
            colorScheme="red"
            width="fit-content"
            size="sm"
            onClick={logoutClickHandler}
          >
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopOver;
