import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Button from '@/components/Button';
import StatisticCard from '@/components/StatisticCard';
import { LANDING_PAGE_MESSAGES } from '@/constants/translations';
import { Link } from '@/libs/navigation';

export default function LandingPage() {
  const t = useTranslations(LANDING_PAGE_MESSAGES);

  return (
    <main className="relative w-full h-screen overflow-y-auto overscroll-y-contain snap-y snap-mandatory no-scrollbar">
      <section className="relative h-screen snap-center py-10 px-32 min-w-min">
        <header className="flex flex-row w-full justify-between items-center mb-20">
          <nav className="flex flex-row space-x-5">
            <Link className="text-white" href="/">
              Thrive
            </Link>
            <Link className="text-white" href="/about">
              {t('about')}
            </Link>
            <Link className="text-white" href="/contact">
              {t('contact')}
            </Link>
          </nav>
          <Link href="/auth/sign-in">
            <Button
              className="font-bold tracking-widest px-6 py-6 rounded-[5px] text-lg border"
              variant="secondary"
            >
              {t('signIn')}
            </Button>
          </Link>
        </header>
        <div className="flex flex-row items-center justify-center px-10 space-x-4">
          <div className="w-full flex flex-col space-y-14 ">
            <h1 className="text-6xl font-bold">{t('WelcomeSection.header')}</h1>
            <p className="text-xl font-medium">{t('WelcomeSection.description')}</p>
            <div className="w-1/2">
              <Link href="/auth/sign-up">
                <Button
                  variant="secondary"
                  className="py-8 px-28 text-2xl rounded-[5px] font-extrabold tracking-wider border"
                >
                  {t('getStarted')}
                </Button>
              </Link>
            </div>
          </div>
          <Image
            src="/images/description-section-image.svg"
            alt=""
            width="500"
            height="500"
            className="hidden lg:block"
          />
        </div>
      </section>
      <section className="bg-black landing-section h-screen flex flex-row space-x-10 snap-center">
        <Image
          src="/images/welcome-section-image.svg"
          alt=""
          width="500"
          height="500"
          className="hidden lg:block"
        />
        <div className="w-1/2 flex flex-col space-y-14">
          <h2 className="text-6xl font-bold">{t('DescriptionSection.header')}</h2>
          <p className="text-xl font-medium">{t('DescriptionSection.description')}</p>
        </div>
      </section>
      <section className="landing-section snap-center ">
        <div className="landing-section flex flex-row m-0  justify-between h-[60vh]">
          <StatisticCard header={t('StatisticsSection.projectsCreated')} value="102 Projects" />
          <StatisticCard header={t('StatisticsSection.applicationMembers')} value="350 Members" />
          <StatisticCard header={t('StatisticsSection.tasksAssigned')} value="1022 Tasks" />
          <StatisticCard header={t('StatisticsSection.pageVisitors')} value="700 Visitors" />
        </div>
        <footer className="landing-section h-[40vh] bg-black">
          <h3 className="text-4xl font-semibold">{t('Footer.title')}</h3>
        </footer>
      </section>
    </main>
  );
}
