const NotFoundStyle = {
    notFoundContainer:{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8
        },
    StyleNumber:{
            fontSize: { xs: '6rem', sm: '8rem' },
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
            opacity: 0.8
          },
    StyleTitle:{
            fontWeight: '600',
            color: 'text.primary',
            mb: 2
          },
    StyleDescription:{
            color: 'text.secondary',
            mb: 4,
            maxWidth: '400px'
          },
    StyleButtonContainer:{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' },
    StyleButton:{
                  px: 4,
                  py: 1.5
                },
                StyleDirectionsContainer:{
            mt: 6,
            p: 3,
            backgroundColor: 'grey.50',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            maxWidth: '400px'
          },
    StyleDirectionsTitle:{ color: 'text.secondary', mb: 1 },
    StyleDirectionsText:{},
}

export default NotFoundStyle;