import { Menu, Portal } from "@chakra-ui/react";
import BaseButton from "../ui/BaseButton";


type ProfileDropdownProps = {
  onSignOut: () => void;
  onRedirectEditProfile: () => void;
};

const ProfileDropdown = ({
  onSignOut,
  onRedirectEditProfile,
}: ProfileDropdownProps) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <BaseButton variant="outline" color="orange.500" colorScheme="orange">
          Profile
        </BaseButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="edit-profile" onClick={onRedirectEditProfile}>
              Edit Profile
            </Menu.Item>
            <Menu.Item value="sign-out" onClick={onSignOut}>
              Sign Out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default ProfileDropdown;
