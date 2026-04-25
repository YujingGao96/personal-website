import ErrorPage from "../../../components/error/ErrorPage";

export default async function ErrorRoute({params}) {
    const {errorCode} = await params;

    return <ErrorPage errorCode={errorCode}/>;
}
