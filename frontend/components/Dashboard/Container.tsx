import styles from "@/styles/Dashboard.module.css";
import { SetStateAction, useEffect, useState } from "react";
import AboutMe from "./AboutMe";
import Skills from "./Skills";
import Projects from "./Projects";
import ProjectData from "./ProjectData";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import SocialMedia from "./SocialMedia";
import { fetchUserData, fetchUserFailure } from "@/redux/slices/fetchUserSlice";
import { useRouter } from "next/router";
import { LoginResponseData } from "@/types/LoginResponseData";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { toast } from "react-toastify";
import Resume from "./Resume";
import { clearAllErrors } from "@/redux/slices/errorSlice";
import { Chip } from "@nextui-org/react";
import { CorrectIconSmall } from "../icons";

export default function DashboardContainer() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.user);
  const aboutMeState = useAppSelector(state => state.aboutMe);
  const skillState = useAppSelector(state => state.skill);
  const projectState = useAppSelector(state => state.project);
  const projectDataState = useAppSelector(state => state.projectData);
  const testimonailState = useAppSelector(state => state.testimonial);
  const contactState = useAppSelector(state => state.contact);
  const socialMediaState = useAppSelector(state => state.socialMedia);
  const error = useAppSelector(state => state.error);
  const router = useRouter();
  const [activeModule, setActiveModule] = useState<JSX.Element>(<AboutMe />);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [modules, setModules] = useState<{ key: SetStateAction<JSX.Element>; value: string; dataNumber: number }[]>([]);

  useEffect(() => {
    setModules([
      {
        key: <AboutMe />,
        value: "About Me",
        dataNumber: aboutMeState.data ? (aboutMeState.data.description ? 1 : 0) : userState.user?.aboutMe?.description ? 1 : 0
      },
      {
        key: <Skills />,
        value: "Skills",
        dataNumber: skillState.data ? skillState.data.length : userState.user?.skills?.length ?? 0
      },
      {
        key: <Projects />,
        value: "Projects",
        dataNumber: projectState.data ? projectState.data.length : userState.user?.projects?.length ?? 0
      },
      {
        key: <ProjectData />,
        value: "Project Data",
        dataNumber: projectDataState.data.length ?? 0
      },
      {
        key: <Testimonials />,
        value: "Testimonials",
        dataNumber: testimonailState.data ? testimonailState.data.length : userState.user?.testimonials?.length ?? 0
      },
      {
        key: <Contact />,
        value: "Contact",
        dataNumber: contactState.data ? (contactState.data?.phoneNo ? 1 : 0) : userState.user?.contact?.phoneNo ? 1 : 0
      },
      {
        key: <SocialMedia />,
        value: "Social Media",
        dataNumber: socialMediaState.data ? socialMediaState.data.length : userState.user?.socialMedias?.length ?? 0
      },
      {
        key: <Resume />,
        value: 'Resume',
        dataNumber: 0
      }
    ]);
  }, [userState.success, aboutMeState.data, contactState.data, skillState.data, projectState.data, projectDataState.data, testimonailState.data, socialMediaState.data, userState.user?.aboutMe?.description, userState.user?.contact?.phoneNo, userState.user?.projects?.length, userState.user?.skills?.length, userState.user?.socialMedias?.length, userState.user?.testimonials?.length])

  useEffect(() => {
    dispatch(clearAllErrors());
    const localStorageData = localStorage.getItem('data');
    const dataJson: LoginResponseData = JSON.parse(localStorageData ? localStorageData : '{}');
    dispatch(fetchUserData({ username: null, token: dataJson.token }));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(error).length && error.general === 'Session Expired') {
      dispatch(fetchUserFailure());
      toast.error("Session Expired");
      router.push('/login');
    }
  }, [dispatch, router, error])

  return (
    <section className={styles["dashboard-main"]}>
      <div className={styles["left-panel"]}>
        <ul className="w-full">
          {
            modules.map((module, index) => {
              return (
                <div className={` ${activeModuleIndex == index ? styles['activeModule'] : styles['module']}`} key={index} onClick={() => {
                  setActiveModuleIndex(index);
                  setActiveModule(module.key);
                }}
                >
                  <li className="flex justify-between items-center">{module.value}
                    {
                      module.dataNumber
                        ?
                        <Chip size="sm" className="bg-success-400 ms-2 w-2 h-5 text-white text-xs">
                          {
                            module.value === 'About Me' || module.value === 'Contact' ?
                              <CorrectIconSmall />
                              :
                              module.dataNumber
                          }

                        </Chip>
                        :
                        undefined
                    }
                  </li>
                </div>
              )
            })
          }
        </ul>
      </div>
      <div className={styles["right-panel"]}>{activeModule}</div>
    </section>
  );
}