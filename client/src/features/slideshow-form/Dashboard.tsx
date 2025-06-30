import { Flex, Box, Grid, Stack, Container } from "@chakra-ui/react";
import ProgressBar from "./dashboard/progress-bar/ProgressBar";
import SidebarNavigation from "./dashboard/main-layout/sidebar-navigation/SidebarNavigation";
import {
  VitalsCard,
  HardSkillsCard,
  SoftSkillsCard,
  EducationCard,
  ExperienceStepForm,
  ProjectsCard,
  PreferencesCard,
  MilitaryCard,
} from "./dashboard/main-layout/section-cards";
import { useSlideshowFormStore } from "./store";
import Navbar from "@/ui/Navbar";

const Dashboard = () => {
  const formData = useSlideshowFormStore((state) => state.formData);

  return (
    <Box minH="100vh">
      <Navbar />
      <Flex minH="calc(100vh - 64px)">
        {/* Sidebar Navigation - Hidden on mobile, visible on md+ */}
        <Box display={{ base: "none", md: "block" }}>
          <SidebarNavigation />
        </Box>

        {/* Main Content Area */}
        <Box flex="1" overflow="auto">
          <Container maxW="7xl" py={8} px={6}>
            <Stack gap={{ base: 4, md: 8 }}>
              {/* Progress Bar Section */}
              <Box display="flex" justifyContent="center" >
                <ProgressBar formData={formData} width="900px" />
              </Box>

              {/* Cards Grid Section */}
              <Box>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={{ base: 3, md: 6 }}
                  w="full"
                >
                  <VitalsCard mediaColumn="left" />
                  <HardSkillsCard mediaColumn="right" />
                  <SoftSkillsCard mediaColumn="left" />
                  <EducationCard mediaColumn="right" />
                  <ExperienceStepForm mediaColumn="left" />
                  <ProjectsCard mediaColumn="right" />
                  <PreferencesCard mediaColumn="left" />
                  <MilitaryCard mediaColumn="right" />
                </Grid>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
