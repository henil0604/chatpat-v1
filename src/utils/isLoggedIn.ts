//@ts-nocheck
export default function isLoggedIn($page) {
    return $page?.data?.session ? true : false;
}