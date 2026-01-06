# 배포 및 도메인 연동 가이드 (Vercel)

이 가이드는 Next.js 프로젝트를 **Vercel**을 통해 배포하고 **커스텀 도메인**을 연결하는 방법을 설명합니다.

---

## 1. Vercel을 이용한 배포 (Deployment)

Vercel은 Next.js를 만든 팀에서 제공하는 호스팅 서비스로, Next.js 프로젝트에 최적화되어 있습니다.

### 1단계: 프로젝트를 Git 저장소에 올리기
배포 전, 코드가 GitHub, GitLab, 또는 Bitbucket에 업로드되어 있어야 합니다.
1. GitHub 등에 새 레포지토리를 생성합니다.
2. 로컬 터미널에서 코드를 푸시합니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git brnach -M main
   # 아래 URL은 본인의 레포지토리 주소로 변경하세요
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

### 2단계: Vercel에 프로젝트 연결
1. [Vercel Dashboard](https://vercel.com/dashboard)에 접속하여 로그인합니다.
2. **"Add New..."** 버튼을 클릭하고 **"Project"**를 선택합니다.
3. GitHub 등과 연동된 계정에서 방금 올린 레포지토리를 찾아 **"Import"**를 클릭합니다.

### 3단계: 배포 설정 (Environment Variables)
1. **Configure Project** 화면이 나옵니다.
2. **Environment Variables** 섹션을 펼칩니다.
3. 로컬에서 사용하던 환경 변수를 추가합니다.
   * **Key**: `GEMINI_API_KEY`
   * **Value**: (당신의 Gemini API 키)
   * **Add** 버튼 클릭.
4. **Deploy** 버튼을 클릭합니다.

잠시 후 배포가 완료되면, Vercel에서 제공하는 기본 도메인(예: `project-name.vercel.app`)으로 접속할 수 있습니다.

---

## 2. 커스텀 도메인 연동 (Custom Domain)

구매하신 도메인(예: `bbpartners.co.kr`)을 Vercel 프로젝트에 연결하는 방법입니다.

### 1단계: Vercel에서 도메인 추가
1. Vercel 대시보드에서 해당 프로젝트로 들어갑니다.
2. 상단 탭에서 **Settings** -> **Domains**를 클릭합니다.
3. 입력창에 연결할 도메인(예: `bbpartners.co.kr`)을 입력하고 **Add**를 클릭합니다.
4. 추천 설정(Recommended)을 선택합니다.

### 2단계: 도메인 구매처(가비아, 후이즈, AWS 등)에서 DNS 설정
Vercel이 제시하는 DNS 레코드를 도메인 구매처의 관리 페이지에 입력해야 합니다.

**상황 A: 서브도메인 없이 루트 도메인(example.com)을 연결하는 경우**
* 보통 **A 레코드**를 설정합니다. Vercel 화면에 표시된 IP 주소(예: `76.76.21.21`)를 복사합니다.
* 도메인 관리 페이지의 DNS 설정으로 이동하여 레코드를 추가합니다:
  * **타입**: `A`
  * **호스트(이름)**: `@` (일부 서비스는 공란)
  * **값/IP**: `76.76.21.21`

**상황 B: 서브도메인(www.example.com)을 연결하는 경우**
* 보통 **CNAME 레코드**를 설정합니다.
* 도메인 관리 페이지에서:
  * **타입**: `CNAME`
  * **호스트(이름)**: `www`
  * **값/타겟**: `cname.vercel-dns.com`

### 3단계: 확인
* DNS 설정 후 전파되기까지 짧게는 몇 분, 길게는 24시간이 걸릴 수 있습니다.
* Vercel Domains 페이지에서 해당 도메인 옆에 **Valid Configuration** (초록색 체크)이 뜨면 연결이 완료된 것입니다.
