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
            "Items": "Items",
            "Title": "Title",
            "Price": "Price",
            "Quantity": "Quantity",
            "Total": "Total",
            "Remove": "Remove",
            "Cart Totals": "Cart Totals",
            "Subtotal": "Subtotal",
            "Delivery Fee": "Delivery Fee",
            "PROCEED TO CHECKOUT": "PROCEED TO CHECKOUT",
            "If you have a promo code, Enter it here": "If you have a promo code, Enter it here",
            "Promo code": "Promo code",
            "Submit": "Submit",

            // MyOrders
            "My Orders": "My Orders",
            "Orders": "My Orders",
            "Logout": "Logout",
            "trackOrder": "Track Order",
            "View Order Details": "View Order Details",
            "No orders found.": "No orders found.",
            "Back to Orders": "Back to Orders",
            "Order Details": "Order Details",
            "Order Date": "Order Date",
            "Status": "Status",
            "Total Amount": "Total Amount",
            "Name": "Name",
            "Email": "Email",
            "Delivery Information": "Delivery Information",

            // PlaceOrder
            "First Name": "First Name",
            "Last Name": "Last Name",
            "Email address": "Email address",
            "Street": "Street",
            "City": "City",
            "State": "State",
            "Zip code": "Zip code",
            "Country": "Country",
            "Phone": "Phone",
            "PROCEED TO PAYMENT": "PROCEED TO PAYMENT",
            "Delivery Options": "Delivery Options",
            "Deliver Now": "Deliver Now",
            "Schedule for Later": "Schedule for Later",
            "recommendationsForYou": "Recommendations for you",

            // --- THÊM MỚI: Order Statuses ---
            "Pending Payment": "Pending Payment",
            "Food Processing": "Food Processing",
            "Out for Delivery": "Out for Delivery",
            "Delivered": "Delivered",
            "Scheduled": "Scheduled"
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
            "Items": "商品",
            "Title": "タイトル",
            "Price": "価格",
            "Quantity": "数量",
            "Total": "合計",
            "Remove": "削除",
            "Cart Totals": "カート合計",
            "Subtotal": "小計",
            "Delivery Fee": "配送料",
            "PROCEED TO CHECKOUT": "チェックアウトに進む",
            "If you have a promo code, Enter it here": "プロモーションコードをお持ちの場合は、ここに入力してください",
            "Promo code": "プロモーションコード",
            "Submit": "送信",
            
            // MyOrders
            "My Orders": "私の注文",
            "Orders": "私の注文",
            "Logout": "ログアウト",
            "trackOrder": "注文を追跡",
            "View Order Details": "注文詳細を見る",
            "No orders found.": "注文が見つかりません。",
            "Back to Orders": "注文リストに戻る",
            "Order Details": "注文詳細",
            "Order Date": "注文日",
            "Status": "ステータス",
            "Total Amount": "合計金額",
            "Name": "名前",
            "Email": "メール",
            "Delivery Information": "配送情報",

            // PlaceOrder
            "First Name": "名",
            "Last Name": "姓",
            "Email address": "メールアドレス",
            "Street": "通り",
            "City": "市",
            "State": "州",
            "Zip code": "郵便番号",
            "Country": "国",
            "Phone": "電話番号",
            "PROCEED TO PAYMENT": "お支払いに進む",
            "Delivery Options": "配達オプション",
            "Deliver Now": "すぐに配達",
            "Schedule for Later": "後で配達を予約",
            "recommendationsForYou": "あなたへのおすすめ",

            // --- THÊM MỚI: Order Statuses ---
            "Pending Payment": "支払い待ち",
            "Food Processing": "準備中",
            "Out for Delivery": "配達中",
            "Delivered": "配達済み",
            "Scheduled": "予約済み"
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