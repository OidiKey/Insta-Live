import { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import ProfileSetup from "./ProfileSetup";
import MainMenu from "./MainMenu";
import LiveSimulator from "./LiveSimulator";

type AppScreen = "welcome" | "profile-setup" | "main-menu" | "live";

interface UserProfile {
  username: string;
  profilePicture: string;
}

export default function InstagramLiveApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("welcome");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Check for saved profile on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("instagram-live-profile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfile(profile);
        setCurrentScreen("main-menu");
      } catch (error) {
        console.error("Failed to parse saved profile", error);
        localStorage.removeItem("instagram-live-profile");
      }
    }
  }, []);

  const handleProfileComplete = (username: string, profilePicture: string) => {
    const profile = { username, profilePicture };
    setUserProfile(profile);
    localStorage.setItem("instagram-live-profile", JSON.stringify(profile));
    setCurrentScreen("main-menu");
  };

  const handleStartLive = () => {
    setCurrentScreen("live");
  };

  const handleExitLive = () => {
    setCurrentScreen("main-menu");
  };

  const handleEditProfile = () => {
    setCurrentScreen("profile-setup");
  };

  const handleGetStarted = () => {
    setCurrentScreen("profile-setup");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 sm:p-4">
      {currentScreen === "welcome" && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}

      {currentScreen === "profile-setup" && (
        <ProfileSetup
          onComplete={handleProfileComplete}
          initialUsername={userProfile?.username || ""}
          initialProfilePicture={userProfile?.profilePicture || ""}
        />
      )}

      {currentScreen === "main-menu" && userProfile && (
        <MainMenu
          username={userProfile.username}
          profilePicture={userProfile.profilePicture}
          onStartLive={handleStartLive}
          onEditProfile={handleEditProfile}
        />
      )}

      {currentScreen === "live" && userProfile && (
        <LiveSimulator
          username={userProfile.username}
          profilePicture={userProfile.profilePicture}
          onExit={handleExitLive}
        />
      )}
    </div>
  );
}
