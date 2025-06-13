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
} from "./dashboard/main-layout/section-cards";
import { calculateOverallCompletion } from "./utils/mockData";

const Dashboard = () => {
  return (
    <>
      <Flex minH="100vh" bg={{ base: "gray.50", _dark: "gray.900" }}>
        {/* Sidebar Navigation */}
        <SidebarNavigation />

        {/* Main Content Area */}
        <Box flex="1" overflow="auto">
          <Container maxW="7xl" py={8} px={6}>
            <Stack gap={8}>
              {/* Progress Bar Section */}
              <Box>
                <ProgressBar
                  completionPercentage={calculateOverallCompletion()}
                />
              </Box>

              {/* Cards Grid Section */}
              <Box>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={6}
                  w="full"
                >
                  <VitalsCard />
                  <HardSkillsCard />
                  <SoftSkillsCard />
                  <EducationCard />
                  <ExperienceStepForm />
                  <ProjectsCard />
                  <PreferencesCard />
                </Grid>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
