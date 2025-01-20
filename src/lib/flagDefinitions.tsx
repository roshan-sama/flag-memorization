// flagDefinitions.tsx
import { FlagDefinition } from "../types";

export const FLAGS: Record<string, FlagDefinition> = {
  // Region Asia-Pacific
  Japan: {
    name: "Japan",
    completeOutlinePath: "M0,0 h300 v200 h-300 Z",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="150"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="200"
              cy="70"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "background",
        color: null,
        path: "M0,0 h300 v200 h-300 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "circle",
        color: null,
        path: "M150,100 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0",
        correctColor: "#FF0000",
      },
    ],
  },
  // Region Europe
  France: {
    name: "France",
    completeOutlinePath:
      "M0,0 h300 v200 h-300 Z M100,0 L100,200 M200,0 L200,200",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M100,0 L100,200 M200,0 L200,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,67 L300,67 M0,133 L300,133"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M150,0 L150,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "left",
        color: null,
        path: "M0,0 h100 v200 h-100 Z",
        correctColor: "#0000FF",
      },
      {
        id: "middle",
        color: null,
        path: "M100,0 h100 v200 h-100 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "right",
        color: null,
        path: "M200,0 h100 v200 h-100 Z",
        correctColor: "#FF0000",
      },
    ],
  },
  // Region Africa
  Algeria: {
    name: "Algeria",
    completeOutlinePath: "M0,0 h300 v200 h-300 Z",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M193.3 75a50 50 0 1 0 0 50 40 40 0 1 1 0-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M195.23 100 150 85.31l27.95 38.47v-47.55L150 114.69z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M193.3 100a50 50 0 1 0 0 50 40 40 0 1 1 0-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M195.23 125 150 110.31l27.95 38.47v-47.55L150 139.69z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="175"
              cy="100"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M175 70l15 45-40-29h50l-40 29z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "left",
        color: null,
        path: "M0,0 h150 v200 h-150 Z",
        correctColor: "#006400", // Dark green
      },
      {
        id: "right",
        color: null,
        path: "M150,0 h150 v200 h-150 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "emblem",
        color: null,
        path: "M193.3 75a50 50 0 1 0 0 50 40 40 0 1 1 0-50M195.23 100 150 85.31l27.95 38.47v-47.55L150 114.69z",
        correctColor: "#FF0000", // Proper red
      },
    ],
  },
  Angola: {
    name: "Angola",
    completeOutlinePath: "M0,0 h300 v200 h-300 Z",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Star outline */}
            <path
              d="M130.286 68.599h12.215l3.704-11.512 3.803 11.512h12.213l-9.811 7.309 3.803 11.712-10.009-7.108-9.91 7.108 3.803-11.712z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Machete and gear */}
            <path
              d="M174.934 131.569l-47.91-36.424-.437.622 47.787 36.524-2.836 3.549-46.584-29.88c-12.613-7.909-12.112-14.115-9.509-20.822l2.203-5.406c1.202 7.008 8.408 12.315 15.916 18.22l42.305 32.499zm12.028 10.867a.743.743 0 1 1-.743-.746.745.745 0 0 1 .743.746m-2.863-2.103a.745.745 0 1 1 0-1.49.745.745 0 0 1 0 1.49m-2.93-2.335a.744.744 0 1 1-.745-.744c.41 0 .745.333.745.744m9.851 4.133l-14.355-11.122-4.171 5.376 12.47 8.745c1.002.7 1.1 3.906 4.802 4.407 1.504.199 2.503-.903 2.503-.903 1.613-1.964 1.174-4.668-1.249-6.503"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Gear detail */}
            <path
              d="M174.934 131.569c9.709-7.908 16.017-20.021 16.017-33.535 0-20.622-14.715-37.941-34.137-42.046l1.501-7.008c2.703.601 5.875 1.739 8.477 2.639l2.503-4.203c2.7 1.3 5.706 2.601 8.207 4.203l-1.901 4.506c2.503 1.603 5.525 4.084 7.205 6.037l3.759-2.936c2.003 2.201 4.406 4.502 6.108 6.907l-3.404 3.504c2.198 3.227 3.048 4.712 4.668 8.429l4.776-1.12c.902 2.803 2.271 6.234 2.773 9.136l-4.522 1.777c.54 2.255 1.239 6.195 1.194 9.508-.004.199-.019.425-.019.626l4.722.674c-.2 2.904-.299 6.208-.901 9.111h-4.905c-.7 3.002-1.603 6.673-2.703 9.475l4.103 2.404c-1.3 2.602-2.6 5.706-4.303 8.209l-4.505-1.901c-1.703 2.502-3.603 4.903-5.706 7.107l2.902 3.803c-.799.7-1.501 1.402-2.303 2.203m-21.12-.901l7.257 4.373c-.677.619-2.704 1.669-3.241 1.881l1.187 4.555c-2.802.903-5.807 2.203-8.908 2.804l-1.802-4.504c-2.903.6-5.805 1-8.809 1l-.602 4.705c-2.802-.199-6.206 0-9.309-.701v-4.703c-2.804-.502-5.506-1.202-8.108-2.104l-2.303 4.107c-2.402-1.003-5.605-2.205-8.209-3.805l1.703-4.505c-2.103-1.102-4.005-2.503-5.807-3.907l4.505-5.706c7.409 5.907 16.718 9.409 26.929 9.409 5.407 0 10.711-.899 15.518-2.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M130.286 88.599h12.215l3.704-11.512 3.803 11.512h12.213l-9.811 7.309 3.803 11.712-10.009-7.108-9.91 7.108 3.803-11.712z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M174.934 151.569l-47.91-36.424 47.787 36.524-2.836 3.549-46.584-29.88c-12.613-7.909-12.112-14.115-9.509-20.822"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <circle
              cx="150"
              cy="100"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M150 80l12 35-30-22h36l-30 22z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "top",
        color: null,
        path: "M0,0 h300 v100 h-300 Z",
        correctColor: "#FF0000",
        // correctColor: "#cc092f",
      },
      {
        id: "bottom",
        color: null,
        path: "M0,100 h300 v100 h-300 Z",
        correctColor: "#000000",
      },
      {
        id: "emblem",
        color: null,
        path: "M130.286 68.599h12.215l3.704-11.512 3.803 11.512h12.213l-9.811 7.309 3.803 11.712-10.009-7.108-9.91 7.108 3.803-11.712z M174.934 131.569l-47.91-36.424-.437.622 47.787 36.524-2.836 3.549-46.584-29.88c-12.613-7.909-12.112-14.115-9.509-20.822l2.203-5.406c1.202 7.008 8.408 12.315 15.916 18.22l42.305 32.499zm12.028 10.867a.743.743 0 1 1-.743-.746.745.745 0 0 1 .743.746m-2.863-2.103a.745.745 0 1 1 0-1.49.745.745 0 0 1 0 1.49m-2.93-2.335a.744.744 0 1 1-.745-.744c.41 0 .745.333.745.744m9.851 4.133l-14.355-11.122-4.171 5.376 12.47 8.745c1.002.7 1.1 3.906 4.802 4.407 1.504.199 2.503-.903 2.503-.903 1.613-1.964 1.174-4.668-1.249-6.503 M174.934 131.569c9.709-7.908 16.017-20.021 16.017-33.535 0-20.622-14.715-37.941-34.137-42.046l1.501-7.008c2.703.601 5.875 1.739 8.477 2.639l2.503-4.203c2.7 1.3 5.706 2.601 8.207 4.203l-1.901 4.506c2.503 1.603 5.525 4.084 7.205 6.037l3.759-2.936c2.003 2.201 4.406 4.502 6.108 6.907l-3.404 3.504c2.198 3.227 3.048 4.712 4.668 8.429l4.776-1.12c.902 2.803 2.271 6.234 2.773 9.136l-4.522 1.777c.54 2.255 1.239 6.195 1.194 9.508-.004.199-.019.425-.019.626l4.722.674c-.2 2.904-.299 6.208-.901 9.111h-4.905c-.7 3.002-1.603 6.673-2.703 9.475l4.103 2.404c-1.3 2.602-2.6 5.706-4.303 8.209l-4.505-1.901c-1.703 2.502-3.603 4.903-5.706 7.107l2.902 3.803c-.799.7-1.501 1.402-2.303 2.203m-21.12-.901l7.257 4.373c-.677.619-2.704 1.669-3.241 1.881l1.187 4.555c-2.802.903-5.807 2.203-8.908 2.804l-1.802-4.504c-2.903.6-5.805 1-8.809 1l-.602 4.705c-2.802-.199-6.206 0-9.309-.701v-4.703c-2.804-.502-5.506-1.202-8.108-2.104l-2.303 4.107c-2.402-1.003-5.605-2.205-8.209-3.805l1.703-4.505c-2.103-1.102-4.005-2.503-5.807-3.907l4.505-5.706c7.409 5.907 16.718 9.409 26.929 9.409 5.407 0 10.711-.899 15.518-2.9",
        correctColor: "#FFD700",
        // correctColor: "#ffcb00",
      },
    ],
  },
  Benin: {
    name: "Benin",
    completeOutlinePath:
      "M0,0 h300 v200 h-300 Z M120,0 L120,200 M120,100 L300,100",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M120,0 L120,200 M120,100 L300,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M150,0 L150,200 M150,100 L300,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M100,0 L100,200 M200,0 L200,200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "left",
        color: null,
        path: "M0,0 h120 v200 h-120 Z",
        correctColor: "#008000",
        // correctColor: "#008751", // Green
      },
      {
        id: "top-right",
        color: null,
        path: "M120,0 h180 v100 h-180 Z",
        correctColor: "#FFD700", // Yellow
        // correctColor: "#fcd116", // Yellow
      },
      {
        id: "bottom-right",
        color: null,
        path: "M120,100 h180 v100 h-180 Z",
        correctColor: "#FF0000", // Red
        // correctColor: "#e8112d", // Red
      },
    ],
  },
  Botswana: {
    name: "Botswana",
    completeOutlinePath:
      "M0,0 h300 v200 h-300 Z M0,75 L300,75 M0,83 L300,83 M0,117 L300,117 M0,125 L300,125",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,75 L300,75 M0,83 L300,83 M0,117 L300,117 M0,125 L300,125"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,60 L300,60 M0,70 L300,70 M0,130 L300,130 M0,140 L300,140"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,90 L300,90 M0,100 L300,100 M0,100 L300,100 M0,110 L300,110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "top-blue",
        color: null,
        path: "M0,0 h300 v75 h-300 Z",
        correctColor: "#87CEEB",
        // correctColor: "#6DA9D2",
      },
      {
        id: "top-white",
        color: null,
        path: "M0,75 h300 v8 h-300 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "black",
        color: null,
        path: "M0,83 h300 v34 h-300 Z",
        correctColor: "#000000",
      },
      {
        id: "bottom-white",
        color: null,
        path: "M0,117 h300 v8 h-300 Z",
        correctColor: "#FFFFFF",
      },
      {
        id: "bottom-blue",
        color: null,
        path: "M0,125 h300 v75 h-300 Z",
        correctColor: "#87CEEB",
        // correctColor: "#6DA9D2",
      },
    ],
  },
  "Burkina Faso": {
    name: "Burkina Faso",
    completeOutlinePath: "M0,0 h300 v200 h-300 Z M0,100 h300",
    outlineOptions: [
      {
        id: "correct",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,100 h120"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M180,100 h120"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M150,50 l30.9017,95.1057 l-80.9017-58.7785 h100 l-80.9017,58.7785 l30.9017,-95.1057"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: true,
      },
      {
        id: "wrong1",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M150,0 v200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M150,70 l30.9017,95.1057 l-80.9017-58.7785 h100 l-80.9017,58.7785 l30.9017,-95.1057"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
      {
        id: "wrong2",
        svg: (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <path
              d="M0,100 h300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="150"
              cy="100"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ),
        isCorrect: false,
      },
    ],
    regions: [
      {
        id: "top",
        color: null,
        path: "M0,0 h300 v100 h-300 Z",
        correctColor: "#FF0000",
        // correctColor: "#EF2B2D"
      },
      {
        id: "bottom",
        color: null,
        path: "M0,100 h300 v100 h-300 Z",
        correctColor: "#008000",
        // correctColor: "#009E49"
      },
      {
        id: "star",
        color: null,
        path: "M150,50 l30.9017,95.1057 l-80.9017-58.7785 h100 l-80.9017,58.7785 l30.9017,-95.1057 Z",
        correctColor: "#FFD700",
        // correctColor: "#FCD116"
      },
    ],
  },
  // Burundi: {
  //   name: "Burundi",
  //   completeOutlinePath: "M0,0 h300 v200 h-300 Z",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M-10,-10 L310,210 M310,-10 L-10,210"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="40"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M150,70 l10,17.32 h20 l-10,17.32 l10,17.32 h-20 l-10,17.32 l-10,-17.32 h-20 l10,-17.32 l-10,-17.32 h20 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             transform="translate(0,-20)"
  //           />
  //           <path
  //             d="M150,70 l10,17.32 h20 l-10,17.32 l10,17.32 h-20 l-10,17.32 l-10,-17.32 h-20 l10,-17.32 l-10,-17.32 h20 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             transform="translate(34.64,20) rotate(120,150,100)"
  //           />
  //           <path
  //             d="M150,70 l10,17.32 h20 l-10,17.32 l10,17.32 h-20 l-10,17.32 l-10,-17.32 h-20 l10,-17.32 l-10,-17.32 h20 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             transform="translate(-34.64,20) rotate(240,150,100)"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,100 h300 M150,0 v200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="40"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M-10,-10 L310,210 M310,-10 L-10,210"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="40"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="150"
  //             cy="60"
  //             r="10"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="184.64"
  //             cy="120"
  //             r="10"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="115.36"
  //             cy="120"
  //             r="10"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "background",
  //       color: null,
  //       path: "M0,0 h300 v200 h-300 Z",
  //       correctColor: "#FF0000",
  //       // correctColor: "#c8102e"
  //     },
  //     {
  //       id: "saltire",
  //       color: null,
  //       path: "M-10,-10 L310,210 L290,210 L-30,-10 Z M310,-10 L-10,210 L10,210 L330,-10 Z",
  //       correctColor: "#008000",
  //       // correctColor: "#43b02a"
  //     },
  //     {
  //       id: "saltire-border",
  //       color: null,
  //       path: "M-20,-10 L320,220 L280,220 L-60,-10 Z M320,-20 L-20,220 L20,220 L360,-20 Z",
  //       correctColor: "#FFFFFF",
  //     },
  //     {
  //       id: "circle",
  //       color: null,
  //       path: "M150,60 a40,40 0 1,0 0.1,0 Z",
  //       correctColor: "#FFFFFF",
  //     },
  //     {
  //       id: "stars",
  //       color: null,
  //       path: `M150,50 l10,17.32 h20 l-10,17.32 l10,17.32 h-20 l-10,17.32 l-10,-17.32 h-20 l10,-17.32 l-10,-17.32 h20 z
  //             M184.64,120 l10,17.32 h20 l-10,17.32 l10,17.32 h-20 l-10,17.32 l-10,-17.32 h-20 l10,-17.32 l-10,-17.32 h20 z
  //             M115.36,120 l10,17.32 h20 l-10,17.32 l10,17.32 h-20 l-10,17.32 l-10,-17.32 h-20 l10,-17.32 l-10,-17.32 h20 z`,
  //       correctColor: "#008000",
  //       // correctColor: "#43b02a"
  //     },
  //   ],
  // },
  // "South Africa": {
  //   name: "South Africa",
  //   completeOutlinePath:
  //     "M0,0 h300 v200 h-300 Z M0,33 L300,33 M0,167 L300,167 M75,0 L225,100 L75,200",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,33 L300,33 M0,167 L300,167 M75,0 L225,100 L75,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,50 L300,50 M0,150 L300,150 M100,0 L200,100 L100,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,67 L300,67 M0,133 L300,133 M50,0 L250,100 L50,200"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "top",
  //       color: null,
  //       path: "M0,0 h300 v33 h-300 Z",
  //       correctColor: "#FF0000",
  //     },
  //     {
  //       id: "bottom",
  //       color: null,
  //       path: "M0,167 h300 v33 h-300 Z",
  //       correctColor: "#0000FF",
  //     },
  //     {
  //       id: "middle",
  //       color: null,
  //       path: "M0,33 h300 v134 h-300 Z",
  //       correctColor: "#FFFFFF",
  //     },
  //     {
  //       id: "triangle",
  //       color: null,
  //       path: "M0,0 L75,100 L0,200 Z",
  //       correctColor: "#000000",
  //     },
  //     {
  //       id: "yellowStripe",
  //       color: null,
  //       path: "M75,0 L225,100 L75,200 h-25 L175,100 L50,200 Z",
  //       correctColor: "#FFD700",
  //     },
  //     {
  //       id: "greenStripe",
  //       color: null,
  //       path: "M50,0 L200,100 L50,200 h-25 L150,100 L25,200 Z",
  //       correctColor: "#008000",
  //     },
  //   ],
  // },
  // Kenya: {
  //   name: "Kenya",
  //   completeOutlinePath: "M0,0 h300 v200 h-300 Z M0,50 L300,50 M0,150 L300,150",
  //   outlineOptions: [
  //     {
  //       id: "correct",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,50 L300,50 M0,150 L300,150"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M150,75 m-25,0 l50,25 l-50,25 l-50,-25 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: true,
  //     },
  //     {
  //       id: "wrong1",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,67 L300,67 M0,133 L300,133"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M150,100 m-20,0 l40,20 l-40,20 l-40,-20 z"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //     {
  //       id: "wrong2",
  //       svg: (
  //         <svg viewBox="0 0 300 200" className="w-full h-full">
  //           <path
  //             d="M0,40 L300,40 M0,160 L300,160"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <circle
  //             cx="150"
  //             cy="100"
  //             r="30"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //       isCorrect: false,
  //     },
  //   ],
  //   regions: [
  //     {
  //       id: "top",
  //       color: null,
  //       path: "M0,0 h300 v50 h-300 Z",
  //       correctColor: "#000000",
  //     },
  //     {
  //       id: "middle",
  //       color: null,
  //       path: "M0,50 h300 v100 h-300 Z",
  //       correctColor: "#FF0000",
  //     },
  //     {
  //       id: "bottom",
  //       color: null,
  //       path: "M0,150 h300 v50 h-300 Z",
  //       correctColor: "#008000",
  //     },
  //     {
  //       id: "shield",
  //       color: null,
  //       path: "M150,75 m-25,0 l50,25 l-50,25 l-50,-25 z",
  //       correctColor: "#FFFFFF",
  //     },
  //   ],
  // },
};
