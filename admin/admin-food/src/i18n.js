import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // Sidebar
            "addItems": "Add Items",
            "listItems": "List Items",
            "orders": "Orders",

            // Add Page
            "uploadImage": "Upload Image",
            "productName": "Product name",
            "typeHere": "Type here",
            "productDescription": "Product description",
            "writeContentHere": "Write content here",
            "productCategory": "Product category",
            "productPrice": "Product price",
            "addButton": "ADD",

            // List Page
            "allFoodList": "All Food List",
            "image": "Image",
            "name": "Name",
            "category": "Category",
            "price": "Price",
            "action": "Action",
            "errorFetchingList": "Error fetching list",
            "errorRemovingFood": "Error removing food",

            // Edit Modal (MỚI THÊM)
            "editFoodItem": "Edit Food Item",
            "currentImage": "Current Image",
            "changeImage": "Change Image",
            "update": "Update",
            "cancel": "Cancel",
            "errorUpdatingFood": "Error updating food",
            "enterProductName": "Enter product name",
            "enterProductDescription": "Enter product description",
            "enterProductPrice": "Enter product price",

            // Orders Page
            "orderPage": "Order Page",
            "itemsLabel": "Items",
            "statusProcessing": "Food Processing",
            "statusOutForDelivery": "Out for delivery",
            "statusDelivered": "Delivered",
            "error": "Error",
            "adminPanel": "Admin Panel",
            "edit": "Edit"
        }
    },
    ja: {
        translation: {
            // Sidebar
            "addItems": "アイテムを追加",
            "listItems": "アイテム一覧",
            "orders": "注文管理",

            // Add Page
            "uploadImage": "画像をアップロード",
            "productName": "商品名",
            "typeHere": "ここに入力",
            "productDescription": "商品説明",
            "writeContentHere": "内容を記入してください",
            "productCategory": "商品カテゴリ",
            "productPrice": "商品価格",
            "addButton": "追加",

            // List Page
            "allFoodList": "すべての食品リスト",
            "image": "画像",
            "name": "名前",
            "category": "カテゴリ",
            "price": "価格",
            "action": "アクション",
            "errorFetchingList": "リストの取得中にエラーが発生しました",
            "errorRemovingFood": "食品の削除中にエラーが発生しました",

            // Edit Modal (MỚI THÊM)
            "editFoodItem": "食品アイテムを編集",
            "currentImage": "現在の画像",
            "changeImage": "画像を変更",
            "update": "更新",
            "cancel": "キャンセル",
            "errorUpdatingFood": "食品の更新中にエラーが発生しました",
            "enterProductName": "商品名を入力してください",
            "enterProductDescription": "商品説明を入力してください",
            "enterProductPrice": "商品価格を入力してください",

            // Orders Page
            "orderPage": "注文ページ",
            "itemsLabel": "品目",
            "statusProcessing": "調理中",
            "statusOutForDelivery": "配達中",
            "statusDelivered": "配達済み",
            "error": "エラー",
            "adminPanel": "管理パネル",
            "edit": "編集"
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