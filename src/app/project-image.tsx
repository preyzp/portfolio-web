import Image from "next/image";
import mobileCover from "../../public/images/portfolio/ruang-kelas/cover.webp";
import mobileOverview from "../../public/images/portfolio/ruang-kelas/overview.webp";
import mobileProcess from "../../public/images/portfolio/ruang-kelas/process.webp";
import mobileSolution from "../../public/images/portfolio/ruang-kelas/solution.webp";
import mobileResponsive from "../../public/images/portfolio/ruang-kelas/responsive.webp";
import adminCover from "../../public/images/portfolio/ruang-kelas-super-admin/cover.webp";
import adminOverview from "../../public/images/portfolio/ruang-kelas-super-admin/overview.webp";
import adminProcess from "../../public/images/portfolio/ruang-kelas-super-admin/process.webp";
import adminSolution from "../../public/images/portfolio/ruang-kelas-super-admin/solution.webp";
import adminResponsive from "../../public/images/portfolio/ruang-kelas-super-admin/responsive.webp";
import contractCover from "../../public/images/portfolio/contractx/01-cover.webp";
import contractOverview from "../../public/images/portfolio/contractx/02-overview.webp";
import contractProcess from "../../public/images/portfolio/contractx/03-process.webp";
import contractSolution from "../../public/images/portfolio/contractx/04-solution.webp";
import contractResponsive from "../../public/images/portfolio/contractx/05-responsive.webp";
import projectCover from "../../public/images/portfolio/projectx/01-cover.webp";
import projectOverview from "../../public/images/portfolio/projectx/02-overview.webp";
import projectProcess from "../../public/images/portfolio/projectx/03-process.webp";
import projectSolution from "../../public/images/portfolio/projectx/04-solution.webp";
import projectResponsive from "../../public/images/portfolio/projectx/05-responsive.webp";
import kemangCover from "../../public/images/portfolio/kemang-village-residences/01-cover.webp";
import kemangOverview from "../../public/images/portfolio/kemang-village-residences/02-overview.webp";
import kemangProcess from "../../public/images/portfolio/kemang-village-residences/03-process.webp";
import kemangSolution from "../../public/images/portfolio/kemang-village-residences/04-solution.webp";
import kemangResponsive from "../../public/images/portfolio/kemang-village-residences/05-responsive.webp";
import pancongCover from "../../public/images/portfolio/pancong-pos/01-cover.webp";
import pancongOverview from "../../public/images/portfolio/pancong-pos/02-overview.webp";
import pancongProcess from "../../public/images/portfolio/pancong-pos/03-process.webp";
import pancongSolution from "../../public/images/portfolio/pancong-pos/04-solution.webp";
import pancongResponsive from "../../public/images/portfolio/pancong-pos/05-responsive.webp";
import bellezzaCover from "../../public/images/portfolio/the-bellezza/01-cover.webp";
import bellezzaOverview from "../../public/images/portfolio/the-bellezza/02-overview.webp";
import bellezzaProcess from "../../public/images/portfolio/the-bellezza/03-process.webp";
import bellezzaSolution from "../../public/images/portfolio/the-bellezza/04-solution.webp";
import bellezzaResponsive from "../../public/images/portfolio/the-bellezza/05-responsive.webp";
import r3gCover from "../../public/images/portfolio/r3g-pos-landing-page/01-cover.webp";
import r3gOverview from "../../public/images/portfolio/r3g-pos-landing-page/02-overview.webp";
import r3gProcess from "../../public/images/portfolio/r3g-pos-landing-page/03-process.webp";
import r3gSolution from "../../public/images/portfolio/r3g-pos-landing-page/04-solution.webp";
import r3gResponsive from "../../public/images/portfolio/r3g-pos-landing-page/05-responsive.webp";

const images = {
  "/images/portfolio/pancong-pos/01-cover.webp": pancongCover,
  "/images/portfolio/pancong-pos/02-overview.webp": pancongOverview,
  "/images/portfolio/pancong-pos/03-process.webp": pancongProcess,
  "/images/portfolio/pancong-pos/04-solution.webp": pancongSolution,
  "/images/portfolio/pancong-pos/05-responsive.webp": pancongResponsive,
  "/images/portfolio/the-bellezza/01-cover.webp": bellezzaCover,
  "/images/portfolio/the-bellezza/02-overview.webp": bellezzaOverview,
  "/images/portfolio/the-bellezza/03-process.webp": bellezzaProcess,
  "/images/portfolio/the-bellezza/04-solution.webp": bellezzaSolution,
  "/images/portfolio/the-bellezza/05-responsive.webp": bellezzaResponsive,
  "/images/portfolio/r3g-pos-landing-page/01-cover.webp": r3gCover,
  "/images/portfolio/r3g-pos-landing-page/02-overview.webp": r3gOverview,
  "/images/portfolio/r3g-pos-landing-page/03-process.webp": r3gProcess,
  "/images/portfolio/r3g-pos-landing-page/04-solution.webp": r3gSolution,
  "/images/portfolio/r3g-pos-landing-page/05-responsive.webp": r3gResponsive,
  "/images/portfolio/contractx/01-cover.webp": contractCover,
  "/images/portfolio/contractx/02-overview.webp": contractOverview,
  "/images/portfolio/contractx/03-process.webp": contractProcess,
  "/images/portfolio/contractx/04-solution.webp": contractSolution,
  "/images/portfolio/contractx/05-responsive.webp": contractResponsive,
  "/images/portfolio/projectx/01-cover.webp": projectCover,
  "/images/portfolio/projectx/02-overview.webp": projectOverview,
  "/images/portfolio/projectx/03-process.webp": projectProcess,
  "/images/portfolio/projectx/04-solution.webp": projectSolution,
  "/images/portfolio/projectx/05-responsive.webp": projectResponsive,
  "/images/portfolio/kemang-village-residences/01-cover.webp": kemangCover,
  "/images/portfolio/kemang-village-residences/02-overview.webp": kemangOverview,
  "/images/portfolio/kemang-village-residences/03-process.webp": kemangProcess,
  "/images/portfolio/kemang-village-residences/04-solution.webp": kemangSolution,
  "/images/portfolio/kemang-village-residences/05-responsive.webp": kemangResponsive,
  "/images/portfolio/ruang-kelas/cover.webp": mobileCover,
  "/images/portfolio/ruang-kelas/overview.webp": mobileOverview,
  "/images/portfolio/ruang-kelas/process.webp": mobileProcess,
  "/images/portfolio/ruang-kelas/solution.webp": mobileSolution,
  "/images/portfolio/ruang-kelas/responsive.webp": mobileResponsive,
  "/images/portfolio/ruang-kelas-super-admin/cover.webp": adminCover,
  "/images/portfolio/ruang-kelas-super-admin/overview.webp": adminOverview,
  "/images/portfolio/ruang-kelas-super-admin/process.webp": adminProcess,
  "/images/portfolio/ruang-kelas-super-admin/solution.webp": adminSolution,
  "/images/portfolio/ruang-kelas-super-admin/responsive.webp": adminResponsive,
};

export function ProjectImage({ src, alt, preload = false }: { src: string; alt: string; preload?: boolean }) {
  const image = images[src as keyof typeof images];
  if (!image) return null;
  return <Image className="case-image" src={image} alt={alt} sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 1008px) calc(100vw - 48px), 960px" preload={preload} style={{ width: "100%", height: "auto" }} />;
}
