import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // Navbar & Header
            "Home": "Home",
            "Menu": "Menu",
            "Mobile App": "Mobile App",
            "Contact Us": "Contact Us",
            "Order your favourite food here": "Order your favourite food here",
            "Choose from a diverse menu featuring a delectable array of dishes crafted with the food": "Choose from a diverse menu featuring a delectable array of dishes crafted with the food",
            "View Menu": "View Menu",
            "Sign In": "Sign In",
            "Search your favourite food...": "Search your favourite food...",
            "Go": "Go",

            // ExploreMenu
            "Explore our menu": "Explore our menu",
            "exploreMenuText": "Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy customers",

            // FoodDisplay
            "topDishesNearYou": "Top dishes near you",

            // AppDownload
            "forBetterExperienceDownload": "For Better Experience Download <br/> Tomato App",

            // Footer
            "footerDescription": "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum",
            "company": "COMPANY",
            "aboutUs": "About us",
            "delivery": "Delivery",
            "privacyPolicy": "Privacy policy",
            "getInTouch": "GET IN TOUCH",
            "copyright": "Copyright 2024 @ Tomato.com - All Right Reserved.",

            // LoginPopup
            "Login": "Login",
            "Sign Up": "Sign Up",
            "yourName": "Your name",
            "yourEmail": "Your email",
            "Password": "Password",
            "createAccount": "Create account",
            "agreeToTerms": "By continuing, I agree to the terms of use & privacy policy.",
            "createNewAccountPrompt": "Create a new account? ",
            "clickHere": "Click here",
            "alreadyHaveAccountPrompt": "Already have an account? ",
            "loginHere": "Login here",

            // Cart
            "items": "Items",
            "title": "Title",
            "price": "Price",
            "quantity": "Quantity",
            "total": "Total",
            "remove": "Remove",
            "cartTotals": "Cart Totals",
            "subtotal": "Subtotal",
            "deliveryFee": "Delivery Fee",
            "proceedToCheckout": "PROCEED TO CHECKOUT",
            "promoCodePrompt": "If you have a promo code, Enter it here",
            "promoCodePlaceholder": "promo code",
            "submit": "Submit",

            // MyOrders
            "myOrders": "My Orders",
            "Orders": "Orders",
            "Logout": "Logout",
            "trackOrder": "Track Order",

            // PlaceOrder
            "deliveryInformation": "Delivery Information",
            "firstName": "First Name",
            "lastName": "Last Name",
            "emailAddress": "Email address",
            "street": "Street",
            "city": "City",
            "state": "State",
            "zipCode": "Zip code",
            "country": "Country",
            "phone": "Phone",
            "proceedToPayment": "PROCEED TO PAYMENT",
        }
    },
    ja: {
        translation: {
            // Navbar & Header
            "Home": "ホーム",
            "Menu": "メニュー",
            "Mobile App": "モバイルアプリ",
            "Contact Us": "お問い合わせ",
            "Order your favourite food here": "お気に入りの料理をここで注文",
            "Choose from a diverse menu featuring a delectable array of dishes crafted with the food": "多様な料理が揃ったメニューからお選びください",
            "View Menu": "メニューを見る",
            "Sign In": "サインイン",
            "Search your favourite food...": "お気に入りの料理を検索...",
            "Go": "検索",
            
            // ExploreMenu
            "Explore our menu": "メニューを見る",
            "exploreMenuText": "多様なメニューから美味しい料理をお選びください。私たちの使命はお客様を満足させることです",

            // FoodDisplay
            "topDishesNearYou": "お近くの人気料理",

            // AppDownload
            "forBetterExperienceDownload": "より良い体験のために<br/>Tomatoアプリをダウンロード",

            // Footer
            "footerDescription": "Lorem ipsumは、印刷および植字業界の単なるダミーテキストです。Lorem ipsum",
            "company": "会社",
            "aboutUs": "会社概要",
            "delivery": "配達",
            "privacyPolicy": "プライバシーポリシー",
            "getInTouch": "お問い合わせ",
            "copyright": "Copyright 2024 @ Tomato.com - 全著作権所有。",

            // LoginPopup
            "Login": "ログイン",
            "Sign Up": "サインアップ",
            "yourName": "お名前",
            "yourEmail": "メールアドレス",
            "Password": "パスワード",
            "createAccount": "アカウントを作成",
            "agreeToTerms": "続行することにより、利用規約とプライバシーポリシーに同意します。",
            "createNewAccountPrompt": "新しいアカウントを作成しますか？ ",
            "clickHere": "ここをクリック",
            "alreadyHaveAccountPrompt": "すでにアカウントをお持ちですか？ ",
            "loginHere": "ここでログイン",

            // Cart
            "items": "商品",
            "title": "タイトル",
            "price": "価格",
            "quantity": "数量",
            "total": "合計",
            "remove": "削除",
            "cartTotals": "カート合計",
            "subtotal": "小計",
            "deliveryFee": "配送料",
            "proceedToCheckout": "チェックアウトに進む",
            "promoCodePrompt": "プロモーションコードをお持ちの場合は、ここに入力してください",
            "promoCodePlaceholder": "プロモーションコード",
            "submit": "送信",
            
            // MyOrders
            "myOrders": "私の注文",
            "Orders": "注文",
            "Logout": "ログアウト",
            "trackOrder": "注文を追跡",

            // PlaceOrder
            "deliveryInformation": "配送情報",
            "firstName": "名",
            "lastName": "姓",
            "emailAddress": "メールアドレス",
            "street": "通り",
            "city": "市",
            "state": "州",
            "zipCode": "郵便番号",
            "country": "国",
            "phone": "電話番号",
            "proceedToPayment": "お支払いに進む",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;