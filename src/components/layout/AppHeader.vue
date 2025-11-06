<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <div class="logo">
            <span class="logo-icon">🏠</span>
            <div class="logo-text">
              <span class="logo-title">GEORGIA</span>
              <span class="logo-subtitle">FORECLOSURE</span>
            </div>
          </div>
        </router-link>
      </div>

      <nav class="main-nav">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: $route.name === 'ForeclosureList' }"
        >
          Foreclosure List
        </router-link>
        <router-link 
          to="/custom-list" 
          class="nav-link"
          :class="{ active: $route.name === 'CustomList' }"
        >
          Custom List
        </router-link>
        <router-link 
          to="/contact" 
          class="nav-link"
          :class="{ active: $route.name === 'Contact' }"
        >
          Contact
        </router-link>
      </nav>

      <div class="header-actions">
        <div class="professional-badge">
          <span class="badge-text">Professional Plan</span>
          <span class="badge-icon">PP</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.app-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  max-width: 1920px;
  margin: 0 auto;
}

.logo-section {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-title {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 0.5px;
}

.logo-subtitle {
  font-size: 11px;
  font-weight: 600;
  color: #5a6c7d;
  letter-spacing: 0.3px;
  margin-top: 2px;
}

.main-nav {
  display: flex;
  gap: 8px;
  margin-left: 40px;
}

.nav-link {
  padding: 8px 16px;
  text-decoration: none;
  color: #5a6c7d;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;

  &:hover {
    color: #2c3e50;
  }

  &.active {
    color: #2c3e50;
    border-bottom-color: #3b82f6;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.professional-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #f0f4f8;
  border-radius: 20px;
}

.badge-text {
  font-size: 13px;
  font-weight: 500;
  color: #2c3e50;
}

.badge-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #1e5b8a;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .header-container {
    flex-wrap: wrap;
    padding: 12px 16px;
  }

  .main-nav {
    order: 3;
    flex-basis: 100%;
    margin-left: 0;
    margin-top: 12px;
    justify-content: center;
  }
}
</style>

