import React from 'react'
import mainTheme from "../styles/katTheme"
import Link from "next/link"

const Button = (props) => {
  if (props.button) {
    return (
      <button>
        button
      </button>
    )
  } else {
    return (
      <div className="button-container">
        {
          props.internalLink ? <Link href={props.href}>
              <a >
                {
                  props.overLine ?
                    <span className="button__overline">{props.overLine}</span> :
                    ""
                }
                <div>{props.text}</div>
              </a>
          </Link> :
            <a href={props.href}>
              {
                props.overLine ?
                  <span className="button__overline">{props.overLine}</span> :
                  ""
              }
              <div>{props.text}</div>
            </a>
        }

            <style jsx>
              {`
                a {
                  text-decoration: none;
                  background: ${props.outline ? "none" : mainTheme.accent};
                  color: white;
                  margin-bottom: 14px;
                  padding: 5px 0;
                  width: ${props.width ? props.width : "auto"};
                  max-width: 100%;
                  display: block;
                  text-align: center;
                  font-size: 1.1rem;
                  font-family: 'Montserrat', sans-serif;
                  text-transform: uppercase;
                  letter-spacing: 2px;
                  border-radius: 7px;
                  margin-left: ${props.spacing};
                  margin-right: ${props.spacing};
                  border: ${props.outline ? "solid 2px white" : ""};
                  transition: color .2s, background-color .2s;
                }

                a:hover, a:focus {
                  background: #f7f9fc;
                  border: ${props.outline ? "solid 2px" + mainTheme.accent : ""};
                  color: ${mainTheme.accent};
                }

                a:hover .button__overline, a:focus .button__overline {
                  color: ${mainTheme.accent};
                }

                @media all and (min-width: 520px) {
                  font-size: 1.1rem;
                }

                .button__overline {
                  font-weight: bold;
                }

                .button-container {
                  display: flex;
                  flex-shrink: 1;
                }
              `}
            </style>
          </div>

            )
          }
          }

          export default Button
