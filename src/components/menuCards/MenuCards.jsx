import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MenuCard from './MenuCard'
import './MenuCards.scss'

const MenuCards = ({ role }) => {
  const navigate = useNavigate()

  const { user } = useSelector((store) => store.user)
  const roles = user?.roles || []

  const cardData = [
    {
      className: 'incidents',
      colors: ['white', 'white'],
      value: 'Incidents',
      text:
        role === 'ADMIN'
          ? 'Gestion des incidents, consultation, modification et affectation des techniciens.'
          : 'Créer, Consulter les incidents et suivre leur progression.',
      percentFillValue: 80,
      route: '/incidents',
      roles: ['USER', 'TECHNICIEN', 'ADMIN'],
    },
    {
      className: 'demandes',
      colors: ['white', 'white'],
      value: 'Demandes',
      text:
        role === 'ADMIN'
          ? 'Création, modification et attribution des demandes aux services.'
          : 'Créer, Consulter des demandes et suivre leur progression.',
      percentFillValue: 50,
      route: '/demandes',
      roles: ['USER', 'TECHNICIEN', 'ADMIN'],
    },
    {
      className: 'statistiques',
      colors: ['white', 'white'],
      value: 'Statistiques',
      text: 'Suivi des statistiques et des indicateurs de performance.',
      percentFillValue: 40,
      route: '/statistiques',
      roles: ['ADMIN'],
    },
    {
      className: 'utilisateurs',
      colors: ['white', 'white'],
      value: 'Utilisateurs',
      text: 'Gestion des utilisateurs, rôles et permissions.',
      percentFillValue: 40,
      route: '/utilisateurs',
      roles: ['ADMIN'],
    },
    {
      className: 'profil',
      colors: ['white', 'white'],
      value: 'Profil',
      text: 'Consulter votre profil, Voir le détail de votre compte',
      percentFillValue: 40,
      route: '/profil',
      roles: ['USER'],
    },
    // {
    //   className: 'messages',
    //   colors: ['white', 'white'],
    //   value: 'Messages',
    //   text: 'Gestion des messages entre utilisateurs et administrateurs.',
    //   percentFillValue: 40,
    //   route: '/messages',
    //   roles: ['ADMIN', 'TECHNICIEN'],
    // },
    // {
    //   className: 'parametres',
    //   colors: ['white', 'white'],
    //   value: 'Paramètres',
    //   text: 'Personnalisation des paramètres et notifications du système.',
    //   percentFillValue: 40,
    //   route: '/parametres',
    //   roles: ['ADMIN', 'TECHNICIEN'],
    // },
  ]

  const handleCardClick = (route) => {
    navigate(route)
  }

  const filteredCards = cardData.filter((card) =>
    card.roles.some((role) => roles.includes(role))
  )

  return (
    <section className="content-menu-cards">
      {filteredCards.map(
        ({ className, colors, value, text, percentFillValue, route }) => (
          <div
            key={className}
            className={`menu-card ${className}`}
            onClick={() => handleCardClick(route)}
          >
            <MenuCard
              className={className}
              colors={colors}
              percentFillValue={percentFillValue}
              cardInfo={{ value, text }}
            />
          </div>
        )
      )}
    </section>
  )
}

export default MenuCards
