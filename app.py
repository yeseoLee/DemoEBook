import os

import PyPDF2
import streamlit as st


st.markdown(
    """
<style>
.stAppViewContainer .stMain .stMainBlockContainer {
    max-width: 95%;
}
</style>
""",
    unsafe_allow_html=True,
)


def read_pdf(file_path):
    with open(file_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text


def main():
    st.title("📚 전자책 리더")

    # 사이드바 설정
    st.sidebar.header("설정")
    font_size = st.sidebar.slider("글자 크기", 12, 36, 24)

    # data 폴더의 PDF 파일 목록 가져오기
    data_folder = "data"
    try:
        pdf_files = [f for f in os.listdir(data_folder) if f.endswith(".pdf")]

        if not pdf_files:
            st.warning("data 폴더에 PDF 파일이 없습니다.")
            return

        # PDF 파일 선택
        selected_pdf = st.selectbox("읽을 PDF 파일을 선택하세요", pdf_files)

        if selected_pdf:
            try:
                # 선택된 PDF 파일 읽기
                file_path = os.path.join(data_folder, selected_pdf)
                text_content = read_pdf(file_path)

                # 스타일 적용
                st.markdown(
                    f"""
                    <div style='font-size: {font_size}px;
                               line-height: 1.6;
                               padding: 20px;
                               background-color: white;
                               border-radius: 10px;'>
                        {text_content}
                    </div>
                    """,
                    unsafe_allow_html=True,
                )

            except Exception:
                st.error("파일을 읽는 중 오류가 발생했습니다.")

    except FileNotFoundError:
        st.error("data 폴더를 찾을 수 없습니다. 프로젝트 루트에 data 폴더를 생성해주세요.")


if __name__ == "__main__":
    main()
