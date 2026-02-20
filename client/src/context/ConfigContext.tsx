import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { OrgConfig } from '../types';
import { getConfig } from '../api';

const defaultConfig: OrgConfig = {
  name: 'MUT Inter-University Tech Day 2026',
  tagline: 'Learn. Connect. Grow.',
  description:
    'The first ever MUT Inter-University Tech Day brings together the brightest students and industry professionals for conversations that go far beyond the classroom.',
  primaryColor: '#3f7807',
  secondaryColor: '#8ebe79',
  accentColor: '#c959d3',
  email: 'muttechcommunity@gmail.com',
  socialLinks: {
    twitter: 'https://twitter.com/MUTTechDay',
    linkedin: 'https://linkedin.com/company/mut-tech-community',
  },
};

interface ConfigContextValue {
  config: OrgConfig;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextValue>({
  config: defaultConfig,
  refreshConfig: async () => {},
});

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<OrgConfig>(defaultConfig);

  const applyTheme = (cfg: OrgConfig) => {
    document.documentElement.style.setProperty('--bs-primary', cfg.primaryColor);
    document.documentElement.style.setProperty('--brand-primary', cfg.primaryColor);
    document.documentElement.style.setProperty('--brand-secondary', cfg.secondaryColor);
    document.documentElement.style.setProperty('--brand-accent', cfg.accentColor);
    document.title = cfg.name;
  };

  const refreshConfig = async () => {
    try {
      const cfg = await getConfig();
      setConfig(cfg);
      applyTheme(cfg);
    } catch {
      applyTheme(defaultConfig);
    }
  };

  useEffect(() => {
    refreshConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigContext.Provider value={{ config, refreshConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
