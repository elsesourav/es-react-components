import { useEffect } from 'react';
import { ComponentDoc } from '../showcase/componentsData';

const BASE_URL = 'https://es-react-components.dev';
const DEFAULT_TITLE = 'es-react-components — Modern React 19 UI Component Library & Design System';
const DEFAULT_DESCRIPTION =
  'Production-grade React 19 UI component library featuring 93+ kinetic, accessible, theme-driven components with fluid physics, WAI-ARIA compliance, and real-time HSL theming.';
const DEFAULT_KEYWORDS =
  'React 19, UI components, React component library, Tailwind CSS, TypeScript, motion, design system, WAI-ARIA, accessible UI, fluid physics, theme engine, open source';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

function setMeta(selector: string, attr: string, value: string, createTag?: () => HTMLElement) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(selector);
  if (!element && createTag) {
    element = createTag();
    document.head.appendChild(element);
  }
  if (element) {
    element.setAttribute(attr, value);
  }
}

function setJsonLd(id: string, data: Record<string, unknown>) {
  if (typeof document === 'undefined') return;
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

export function useSeoMetadata(component: ComponentDoc | null) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const title = component
      ? `${component.name} React Component — es-react-components`
      : DEFAULT_TITLE;

    const description = component
      ? `${component.description} Interactive live playground, complete TypeScript API, ${component.props.length} props, and theme customization for React 19.`
      : DEFAULT_DESCRIPTION;

    const keywords = component
      ? `${component.name}, React ${component.name}, ${component.category}, React 19 component, Tailwind CSS, TypeScript, es-react-components, UI system`
      : DEFAULT_KEYWORDS;

    const pageUrl = component
      ? `${BASE_URL}/?component=${component.id}`
      : `${BASE_URL}/`;

    // 1. Page Title
    document.title = title;

    // 2. Standard Metadata
    setMeta('meta[name="description"]', 'content', description, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'description');
      return el;
    });

    setMeta('meta[name="keywords"]', 'content', keywords, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'keywords');
      return el;
    });

    // 3. Canonical URL
    setMeta('link[rel="canonical"]', 'href', pageUrl, () => {
      const el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      return el;
    });

    // 4. Open Graph Metadata
    setMeta('meta[property="og:title"]', 'content', title, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:title');
      return el;
    });

    setMeta('meta[property="og:description"]', 'content', description, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:description');
      return el;
    });

    setMeta('meta[property="og:url"]', 'content', pageUrl, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:url');
      return el;
    });

    setMeta('meta[property="og:type"]', 'content', component ? 'article' : 'website', () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:type');
      return el;
    });

    setMeta('meta[property="og:image"]', 'content', DEFAULT_IMAGE, () => {
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:image');
      return el;
    });

    // 5. Twitter Card Metadata
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image', () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:card');
      return el;
    });

    setMeta('meta[name="twitter:title"]', 'content', title, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:title');
      return el;
    });

    setMeta('meta[name="twitter:description"]', 'content', description, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:description');
      return el;
    });

    setMeta('meta[name="twitter:image"]', 'content', DEFAULT_IMAGE, () => {
      const el = document.createElement('meta');
      el.setAttribute('name', 'twitter:image');
      return el;
    });

    // 6. Structured JSON-LD Data
    if (component) {
      setJsonLd('es-schema-component', {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: `${component.name} React Component`,
        operatingSystem: 'Web',
        applicationCategory: 'DesignSystemComponent',
        description: component.description,
        url: pageUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        softwareVersion: '1.0.0',
        programmingLanguage: 'TypeScript, React 19',
        featureList: `${component.props.length} props: ${component.props.map((p) => p.name).join(', ')}`,
        creator: {
          '@type': 'Organization',
          name: 'es-react-components',
          url: BASE_URL,
        },
      });
    } else {
      setJsonLd('es-schema-component', {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'es-react-components',
        description: DEFAULT_DESCRIPTION,
        codeRepository: 'https://github.com/elsesourav/es-react-components',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'React 19, Browser',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Organization',
          name: 'es-react-components',
          url: BASE_URL,
        },
      });
    }
  }, [component]);
}
