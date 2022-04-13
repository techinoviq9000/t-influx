import WelcomeScreen from "../../screens/WelcomeScreen"
import GetStarted from "../../screens/GetStarted"
import ContinueRegistration from "../../screens/ContinueRegistration"
import UploadDocuments from "../../screens/UploadDocuments"
import BeginDocumentSubmission from "../../screens/BeginDocumentSubmission"
import VerifyOTP from "../../screens/VerifyOTP"
import PersonalDetails from "../../screens/PersonalDetails"
import ProductSelection from "../../screens/ProductSelection"
import Login from "../../screens/Login"
import Registration from "../../screens/Registration"
import ApplicationID from "../../screens/ApplicationID"
import BasicAccountDetails from "../../screens/BasicAccountDetails"
import Profession from "../../screens/Profession"
import ForeignTax from "../../screens/ForeignTax"
import NextOfKin from "../../screens/NextOfKin"
import PEP from "../../screens/PEP"
import Declaration from "../../screens/Declaration"
import ToC from "../../screens/ToC"
import Services from "../../screens/Services"
import Address from "../../screens/Address"
import Scanner from "../../screens/Scanner"
import EndScreen from "../../screens/EndScreen"
import VerifyOTPLogin from "../../screens/VerifyOTPLogin"
import PreviousApplications from "../../screens/PreviousApplications"
import BasicAccountDetailsLogin from "../../screens/LoginScreens/BasicAccountDetailsLogin"

import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators
} from "@react-navigation/stack"
import ServicesLogin from "../../screens/LoginScreens/ServicesLogin"

const screenArray = [
  {
    name: "Welcome",
    component: WelcomeScreen,
    options: {
      ...TransitionPresets.SlideFromRightIOS
    }
  }
]
const RegisterRoute = [
  {
    name: "Get Started",
    component: GetStarted
  },
  {
    name: "Registration",
    component: Registration,
    options: () => ({
      gestureEnabled: false,
      cardOverlayEnabled: false,
      transitionSpec: {
        open: {
          animation: "timing",
          config: {
            duration: 100,
            easing: Easing.inOut(Easing.ease)
          }
        },
        close: {
          animation: "timing",
          config: {
            duration: 100,
            easing: Easing.inOut(Easing.ease)
          }
        }
      }
    })
  },
  {
    name: "VerifyOTP",
    component: VerifyOTP,
    options: {
      gestureEnabled: false,
      cardOverlayEnabled: false
    }
  },
  {
    name: "Basic Account Details",
    component: BasicAccountDetails,
    options: {
      gestureEnabled: false,
      cardOverlayEnabled: false
    }
  },
  {
    name: "Services",
    component: Services,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Personal Details",
    component: PersonalDetails,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Scanner",
    component: Scanner,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Application ID Screen",
    component: ApplicationID,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Address",
    component: Address,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Profession",
    component: Profession,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Product Selection",
    component: ProductSelection,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Upload Documents",
    component: UploadDocuments,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Begin Document Submission",
    component: BeginDocumentSubmission,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Foreign Tax",
    component: ForeignTax,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Next Of Kin",
    component: NextOfKin,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "PEP",
    component: PEP,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Declaration",
    component: Declaration,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "ToC",
    component: ToC,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "EndScreen",
    component: EndScreen,
    options: {
      cardOverlayEnabled: false
    }
  }
]

const LoginRoute = [
  {
    name: "Login",
    component: Login,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "VerifyOTPLogin",
    component: VerifyOTPLogin,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Previous Applications",
    component: PreviousApplications,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Continue Application",
    component: ContinueRegistration,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Basic Account Details LoginRoute",
    component: BasicAccountDetailsLogin,
    options: {
      cardOverlayEnabled: false
    }
  },
  {
    name: "Services LoginRoute",
    component: ServicesLogin,
    options: {
      cardOverlayEnabled: false
    }
  },
]

module.exports = { screenArray, RegisterRoute, LoginRoute }
