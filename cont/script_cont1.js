const frame = document.querySelector(".buttonFrame");
const overlayPath = document.querySelector(".overlay-path");
const menuWrap = document.querySelector(".backFace");
const openMenuCtrl = document.querySelector(".button-menu");
const closeMenuCtrl = document.querySelector(".button-close");

// ボタンをクリックした後に走らせるDOM
const hide = {
  main: document.querySelector(".frontContent-title"),
  content: document.querySelector(".frontContent-img"),
  leave: document.querySelector(".backFace-text"),
  clock: document.querySelector(".clock-container"),
};

// ボタンを連打しても違和感がないようにフラグを設ける。
//　　openMenuまたはcloseMenuが発火し終わったら発火するようにする。
let isAnimating = false;

// OPENさせた時
const openMenu = () => {
  if (isAnimating) return;
  isAnimating = true;
  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
    })

    //　初めにアニメーションするパス
    //　透明なパス
    .set(overlayPath, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
    })

    //　扇型を黒く塗りつぶしたパス
    .to(
      overlayPath,
      {
        duration: 0.5,
        ease: "power4.in",
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
      },
      0
    )

    //　真っ黒なパス
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      onComplete: () => {
        frame.classList.add("frontFace--menu-open");
        menuWrap.classList.add("backFace--open");
      },
    })

    //　前面の画像やテキストを上に移動させる。
    .to(
      [hide.main, hide.content, openMenuCtrl],
      {
        duration: 0.5,
        ease: "power3.in",
        y: -200,
        opacity: 0,
        stagger: 0.05,
      },
      0.2
    )

    //　後にアニメーションするパス
    //　真っ黒なパス
    .set(overlayPath, {
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
    })

    //　扇型の余白部分を黒く塗りつぶしたパス
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2.in",
      attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
    })

    //　透明なパス
    .to(overlayPath, {
      duration: 0.5,
      ease: "power4",
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
    })

    //　後面のテキストと時計を移動させながら表示させる。
    .to(
      [hide.leave, hide.clock],
      {
        duration: 1.1,
        ease: "power4",
        startAt: { y: 150 },
        y: 0,
        opacity: 1,
        stagger: 0.05,
      },
      ">-=1.1"
    );
};

// CLOSEさせた時
const closeMenu = () => {
  if (isAnimating) return;
  isAnimating = true;
  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
    })

    //　初めにアニメーションするパス
    //　透明なパス
    .set(overlayPath, {
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
    })

    //　扇型を黒く塗りつぶして反転させたパス
    .to(
      overlayPath,
      {
        duration: 0.5,
        ease: "power4.in",
        attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
      },
      0
    )

    //　真っ黒なパス
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      onComplete: () => {
        frame.classList.remove("frontFace--menu-open");
        menuWrap.classList.remove("backFace--open");
      },
    })

    //　後にアニメーションするパス
    //　真っ黒なパス
    .set(overlayPath, {
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
    })

    //　扇型の余白部分を黒く塗りつぶして反転させたパス
    .to(overlayPath, {
      duration: 0.3,
      ease: "power2.in",
      attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
    })

    //　透明なパス
    .to(overlayPath, {
      duration: 0.5,
      ease: "power4",
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
    })

    //　前面の画像やテキストを上に移動させる。
    .to(
      [hide.main, hide.content, openMenuCtrl],
      {
        duration: 1.1,
        ease: "power4",
        y: 0,
        opacity: 1,
        stagger: -0.05,
      },
      ">-=1.1"
    )

    //　後面のテキストと時計を移動させながら表示させる。
    .to(
      [hide.leave, hide.clock],
      {
        duration: 0.8,
        ease: "power2.in",
        y: 100,
        opacity: 0,
        stagger: -0.05,
      },
      0
    );
};

openMenuCtrl.addEventListener("click", openMenu);
closeMenuCtrl.addEventListener("click", closeMenu);