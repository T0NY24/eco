import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface MarketplaceItem {
  id: number;
  title: string;
  category: string;
  type: 'objeto' | 'servicio' | 'tiempo';
  owner: string;
  location: string;
  distance: string;
  rating: number;
  ecoPoints: number;
  image: string;
  description: string;
  wants: string;
  tags: string[];
  impact: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketplace.html',
  styleUrls: ['./marketplace.scss']
})
export class MarketplaceComponent implements OnInit {
  activeTab: string = 'todos';
  viewMode: 'grid' | 'list' = 'grid';
  selectedCategory: string = 'todos';
  searchQuery: string = '';
  sortBy: string = 'relevantes';
  isLoading: boolean = false;

  stats = {
    totalUsers: '2,847',
    activeExchanges: '1,234',
    co2Saved: '15.7 toneladas',
    itemsExchanged: '8,932'
  };

  userStats = {
    ecoPoints: 1250,
    level: 'Eco Warrior',
    co2Saved: '8.4 kg',
    exchangesCompleted: 23
  };

  tabs = [
    { id: 'todos', label: 'Todos', count: 156 },
    { id: 'objetos', label: 'Objetos', count: 89 },
    { id: 'servicios', label: 'Servicios', count: 45 },
    { id: 'tiempo', label: 'Tiempo', count: 22 }
  ];

  categories: Category[] = [
    { id: 'todos', name: 'Todos', icon: 'grid', count: 156 },
    { id: 'electronica', name: 'Electrónicos', icon: 'smartphone', count: 34 },
    { id: 'hogar', name: 'Hogar', icon: 'home', count: 28 },
    { id: 'libros', name: 'Libros', icon: 'book', count: 19 },
    { id: 'servicios', name: 'Servicios', icon: 'users', count: 45 },
    { id: 'habilidades', name: 'Habilidades', icon: 'star', count: 22 },
    { id: 'deportes', name: 'Deportes', icon: 'activity', count: 15 },
    { id: 'musica', name: 'Música', icon: 'music', count: 12 }
  ];

  sortOptions = [
    { value: 'relevantes', label: 'Más relevantes' },
    { value: 'cercanos', label: 'Más cercanos' },
    { value: 'calificados', label: 'Mejor calificados' },
    { value: 'ecopuntos', label: 'Más eco-puntos' },
    { value: 'recientes', label: 'Más recientes' }
  ];

  items: MarketplaceItem[] = [
    {
      id: 1,
      title: 'Laptop Dell Inspiron 15',
      category: 'electronica',
      type: 'objeto',
      owner: 'María García',
      location: 'Zamora Centro',
      distance: '0.8 km',
      rating: 4.8,
      ecoPoints: 450,
      image: '/assets/images/laptop.jpg',
      description: 'Laptop en excelente estado, ideal para estudiantes. Incluye cargador original.',
      wants: 'Bicicleta de montaña',
      tags: ['Tecnología', 'Estudiantes', 'Trabajo'],
      impact: '2.3 kg CO₂ ahorrados',
      createdAt: new Date('2024-03-15')
    },
    {
      id: 2,
      title: 'Clases de Guitarra',
      category: 'habilidades',
      type: 'servicio',
      owner: 'Carlos Mendez',
      location: 'Barrio El Limón',
      distance: '1.2 km',
      rating: 4.9,
      ecoPoints: 320,
      image: '/assets/images/guitar.jpg',
      description: 'Profesor de música con 10 años de experiencia. Clases personalizadas.',
      wants: 'Ayuda con jardinería',
      tags: ['Música', 'Educación', 'Arte'],
      impact: 'Conocimiento compartido',
      createdAt: new Date('2024-03-14')
    },
    {
      id: 3,
      title: 'Juego de Vajilla Completo',
      category: 'hogar',
      type: 'objeto',
      owner: 'Ana Rodriguez',
      location: 'Zamora Norte',
      distance: '2.1 km',
      rating: 4.7,
      ecoPoints: 280,
      image: '/assets/images/dishes.jpg',
      description: 'Vajilla de porcelana para 6 personas, en perfecto estado.',
      wants: 'Plantas de interior',
      tags: ['Hogar', 'Cocina', 'Decoración'],
      impact: '1.8 kg CO₂ ahorrados',
      createdAt: new Date('2024-03-13')
    },
    {
      id: 4,
      title: 'Reparación de Electrodomésticos',
      category: 'servicios',
      type: 'servicio',
      owner: 'Pedro Silva',
      location: 'Centro Histórico',
      distance: '1.5 km',
      rating: 4.9,
      ecoPoints: 680,
      image: '/assets/images/repair.jpg',
      description: 'Técnico especializado en reparación y mantenimiento de electrodomésticos.',
      wants: 'Intercambio de tiempo libre',
      tags: ['Técnico', 'Reparación', 'Hogar'],
      impact: 'Productos salvados del desperdicio',
      createdAt: new Date('2024-03-12')
    },
    {
      id: 5,
      title: 'Libros de Programación',
      category: 'libros',
      type: 'objeto',
      owner: 'Luis Morales',
      location: 'Universidad Técnica',
      distance: '3.2 km',
      rating: 4.6,
      ecoPoints: 150,
      image: '/assets/images/books.jpg',
      description: 'Colección de libros de desarrollo web y móvil, varios lenguajes.',
      wants: 'Material de diseño gráfico',
      tags: ['Programación', 'Educación', 'Tecnología'],
      impact: '0.9 kg CO₂ ahorrados',
      createdAt: new Date('2024-03-11')
    },
    {
      id: 6,
      title: 'Tiempo para Cuidado de Mascotas',
      category: 'servicios',
      type: 'tiempo',
      owner: 'Sofia Torres',
      location: 'Barrio La Paz',
      distance: '0.9 km',
      rating: 5.0,
      ecoPoints: 200,
      image: '/assets/images/pets.jpg',
      description: 'Estudiante de veterinaria ofrece cuidado de mascotas durante el día.',
      wants: 'Clases de inglés',
      tags: ['Mascotas', 'Cuidado', 'Tiempo'],
      impact: 'Bienestar animal',
      createdAt: new Date('2024-03-10')
    }
  ];

  filteredItems: MarketplaceItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route params
    this.route.params.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
    });

    this.applyFilters();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  setCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.router.navigate(['/marketplace', categoryId === 'todos' ? '' : categoryId]);
    this.applyFilters();
  }

  setSortBy(sortBy: string): void {
    this.sortBy = sortBy;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.isLoading = true;
    
    setTimeout(() => {
      let filtered = [...this.items];

      // Filter by tab
      if (this.activeTab !== 'todos') {
        if (this.activeTab === 'objetos') {
          filtered = filtered.filter(item => item.type === 'objeto');
        } else if (this.activeTab === 'servicios') {
          filtered = filtered.filter(item => item.type === 'servicio');
        } else if (this.activeTab === 'tiempo') {
          filtered = filtered.filter(item => item.type === 'tiempo');
        }
      }

      // Filter by category
      if (this.selectedCategory !== 'todos') {
        filtered = filtered.filter(item => item.category === this.selectedCategory);
      }

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some(tag => tag.toLowerCase().includes(query)) ||
          item.owner.toLowerCase().includes(query)
        );
      }

      // Apply sorting
      filtered = this.sortItems(filtered);

      this.filteredItems = filtered;
      this.isLoading = false;
    }, 300);
  }

  private sortItems(items: MarketplaceItem[]): MarketplaceItem[] {
    switch (this.sortBy) {
      case 'cercanos':
        return items.sort((a, b) => {
          const distanceA = parseFloat(a.distance.replace(' km', ''));
          const distanceB = parseFloat(b.distance.replace(' km', ''));
          return distanceA - distanceB;
        });
      case 'calificados':
        return items.sort((a, b) => b.rating - a.rating);
      case 'ecopuntos':
        return items.sort((a, b) => b.ecoPoints - a.ecoPoints);
      case 'recientes':
        return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      default: // relevantes
        return items.sort((a, b) => b.ecoPoints - a.ecoPoints);
    }
  }

  onExchange(item: MarketplaceItem): void {
    console.log('Exchange initiated for:', item);
    // Aquí implementarías la lógica de intercambio
  }

  onFavorite(item: MarketplaceItem): void {
    console.log('Added to favorites:', item);
    // Aquí implementarías la lógica de favoritos
  }

  onContactOwner(item: MarketplaceItem): void {
    console.log('Contacting owner:', item.owner);
    // Aquí implementarías la lógica de contacto
  }

  onPublishItem(): void {
    console.log('Opening publish dialog');
    // Aquí implementarías la lógica para publicar nuevo item
  }

  onCalculateImpact(): void {
    console.log('Opening impact calculator');
    // Aquí implementarías la calculadora de impacto
  }
}