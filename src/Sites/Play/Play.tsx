import { useEffect, useRef, useState } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { motion } from "framer-motion";
import classes from "./Play.module.css";
import Logo from "../../Graphics/Logo.svg";
import HtmlLogo from "../../Graphics/HtmlLogo.svg";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import toast from "react-hot-toast";
import AvatarComponent from "../../Components/AvatarComponent";
import Button from "../../Components/Button";
import getUserObject from "../../lib/getUser";

interface Challenge {
  id: number;
  challangeImageUrl: string;
  colors: string;
}

export default function Play() {
  const { playlistId = 0, challengeId = 0 } = useParams();
  const [htmlCode, setHtmlCode] = useState(
    "<!--\n HTML goes here (remove this comment or it will count to your score)\n-->\n\n\n\n\n\n\n\n\n"
  );
  const [cssCode, setCssCode] = useState(
    "/*\n CSS goes here (remove this comment or it will count to your score)\n*/\n\n\n\n\n\n\n\n\n"
  );
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [isDirectionChangeWorking, setIsDirectionChangeWorking] =
    useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bestScores, setBestScores] = useState<any[]>([]);
  const [dataAfterSubmission, setDataAfterSubmission] = useState<any>(null);
  const [challange, setChallange] = useState<Challenge>();

  const iframeRef = useRef<any>(null);
  const navigate = useNavigate();

  const myTheme = createTheme({
    theme: "dark",
    settings: {
      background: "#212121",
      backgroundImage: "",
      foreground: "#75baffAF",
      caret: "#fff",
      selection: "#036dd626",
      selectionMatch: "#036dd626",
      lineHighlight: "#8a91991a",
      gutterBackground: "#2E3235",
      gutterForeground: "#8a9199",
    },
    styles: [
      { tag: t.comment, color: "#787b8099" },
      { tag: t.variableName, color: "#0080ff" },
      { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
      { tag: t.number, color: "#5c6166" },
      { tag: t.bool, color: "#5c6166" },
      { tag: t.null, color: "#5c6166" },
      { tag: t.keyword, color: "#5c6166" },
      { tag: t.operator, color: "#5c6166" },
      { tag: t.className, color: "#5c6166" },
      { tag: t.definition(t.typeName), color: "#5c6166" },
      { tag: t.typeName, color: "#5c6166" },
      { tag: t.angleBracket, color: "#5c6166" },
      { tag: t.tagName, color: "#ffffffAA" },
      { tag: t.attributeName, color: "#5c6166" },
    ],
  });

  const handleKeyDown = (event: any) => {
    if (!isDirectionChangeWorking) return;
    if (event.shiftKey) {
      event.preventDefault();
      setIsVertical(!isVertical);
    }
  };

  useEffect(() => {
    const addKeyDownListener = () => {
      document.addEventListener("keydown", handleKeyDown);
    };

    const removeKeyDownListener = () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

    addKeyDownListener();

    return () => {
      removeKeyDownListener();
    };
  }, [handleKeyDown]);

  const handleMouseEnter = () => {
    setIsDirectionChangeWorking(true);
    document.addEventListener("keydown", handleKeyDown);
  };

  const handleMouseLeave = () => {
    setIsDirectionChangeWorking(false);
    setSliderValue(0);
    document.removeEventListener("keydown", handleKeyDown);
  };

  const getBestScores = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/play/topScores/${playlistId}/${challengeId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setBestScores(data);
  };

  const getUserBestScore = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/play/bestUserScore/${playlistId}/${challengeId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data)
    if (data[0].code) {
      let splittedData = data[0].code.split("</style>");
      setCssCode(splittedData[0]);
      setHtmlCode(splittedData[1]);
    }
  };

  const getChallangeData = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/play/${playlistId}/${challengeId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setChallange(data);
  };

  useEffect(() => {
    if (!(getUserObject().id + 1)) {
      navigate("/login");
      return;
    }
    getUserBestScore();
    getBestScores();
    getChallangeData();
  }, []);

  const submitHandler = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/play/submit`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistId,
        challengeId,
        code: `${cssCode.trim()}</style>${htmlCode.trim()}`,
      }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      setDataAfterSubmission(data);
      toast.success("Score submitted!");
      getBestScores();
    }
  };

  const modal = (
    <motion.div
      className={classes.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      <div className={classes.modal}>
        <p>How do we count points?</p>
        <p>
          1. Every playlist, depending on difficulty, has a number of starting
          points (eg. Rookie diff - 500 points)
        </p>
        <p>
          2. We get rid of white chars, and count the length of your code, for
          each character, you lose 0.1 point
        </p>
        <p>
          3. For every percent which does not follow the pattern, we take 10
          points
        </p>
        <p>Minimum number of points is 0</p>
        <Button
          type="alt"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Close
        </Button>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      className={classes.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      {isModalOpen && modal}
      <div className={classes.editors}>
        <div className={classes.lang}>
          <img src={HtmlLogo} alt="Html logo" />
          <p>Html</p>
        </div>
        <CodeMirror
          className={classes.editor}
          value={htmlCode}
          theme={myTheme}
          extensions={[
            EditorView.lineWrapping,
            html({
              matchClosingTags: true,
              selfClosingTags: true,
            }),
          ]}
          minHeight="100%"
          onChange={(e) => {
            setHtmlCode(e);
          }}
        />
        <div className={classes.lang}>
          <img src={Logo} alt="Css logo" />
          <p>Css</p>
        </div>
        <CodeMirror
          className={classes.editor}
          value={cssCode}
          theme={myTheme}
          extensions={[EditorView.lineWrapping, css()]}
          onChange={(e) => {
            setCssCode(e);
          }}
          minHeight="100%"
        />
      </div>
      <div className={classes.controls}>
        <div className={classes.pattern}>
          <div className={classes.iframeCont}>
            <p>Your Solution</p>
            <ImgComparisonSlider
              className={classes.imageSlider}
              direction={`${isVertical ? "vertical" : "horizontal"}`}
              hover={true}
              onMouseEnter={() => {
                handleMouseEnter();
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }}
              value={sliderValue}
            >
              <img
                slot="first"
                width="100%"
                src={challange?.challangeImageUrl}
                alt=""
                className={classes.imageSliderImg}
              />
              <iframe
                srcDoc={`<style>body, html{margin:0;width:400px;height:300px;background:#FFF;overflow:hidden;}${cssCode.trim()}</style>${htmlCode.trim()}`}
                ref={iframeRef}
                slot="second"
                title="output"
                sandbox="allow-same-origin "
                style={{
                  backgroundColor: "#fff",
                }}
                children={undefined}
                loading="lazy"
              />
            </ImgComparisonSlider>
          </div>
          <div>
            <p>Challenge</p>
            <img src={challange?.challangeImageUrl} alt="" />
          </div>
        </div>
        <p className={classes.helper}>Click to copy!</p>
        <div className={classes.colors}>
          {challange?.colors.split(",").map((color, index) => {
            return (
              <div
                key={index}
                className={classes.color}
                onClick={() => {
                  navigator.clipboard.writeText(color.replace(" ", ""));
                  toast.success("Copied to clipboard!");
                  console.log(color);
                }}
              >
                <div style={{ backgroundColor: color }} />
                <p style={{ color: color }}>{color.replace("#", "")}</p>
              </div>
            );
          })}
        </div>
        <div className={classes.line} />
        <div className={classes.bottomFlex}>
          <div className={classes.topScores}>
            <p>Top Scores</p>
            <div className={classes.scores}>
              {bestScores.length > 0 ? (
                bestScores.map((score, i) => {
                  return (
                    <Link
                      to={`/profile/${score.user.id}`}
                      className={classes.score}
                      key={i}
                    >
                      <span>
                        <AvatarComponent
                          userId={score.user.id}
                          userNameForAvatar={score.user.username}
                          size="small"
                        />
                        <p>{score.user.username}</p>
                      </span>
                      <p>{score.score}</p>
                    </Link>
                  );
                })
              ) : (
                <p className={classes.noScores}>No best scores yet!</p>
              )}
            </div>
          </div>
          <div className={classes.lineVertical} />
          <div className={classes.playerStats}>
            <p
              className={classes.info}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              How do we count points?
            </p>
            {dataAfterSubmission ? (
              <>
                <p>Your score: {dataAfterSubmission.score}</p>
                <p>
                  {100 - dataAfterSubmission.misMatchPercentage}% of the pattern
                  was correct!
                </p>
              </>
            ) : (
              <p>Your best score: [best score]</p>
            )}
            <p className={classes.helper}>
              You can submit many times, we'll holding your best score :D
            </p>
            <Button type="default" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
